// Récupération de l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(document.location.search);
const photographerId = urlParams.get("id");

// Sélection des éléments du DOM
const section = document.querySelector(".photograph-header");
const contactBtn = document.querySelector(".contact_button");
const sortBtn = document.querySelector("#sort-btn");
const photographeUrl = "../../data/photographers.json";
const nameModalContact = document.querySelector("#name-contact");

// Éléments du carousel
const gallery = document.querySelector(".gallery");
const bigContainer = document.querySelector(".modal-carousel");
const container = document.querySelector(".container-carousel");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const btnCloseCarousel = document.querySelector(".close-btn");
// Bandeau Bottom
const containerBottom = document.createElement("div");
containerBottom.classList.add("container-bottom");
const likes = document.createElement("p");
likes.classList.add("footer-add");
// Variable pour compter les images dans la galerie
let imageIndex = 0;

const body = document.querySelector("body");
const main = document.querySelector("main");

// ======= Ouverture et Fermeture des modals ======== //

// Fonction pour ouvrir la modal
function onOpenModal(btnClose, modal) {
  main.setAttribute("aria-hidden", "true");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("no-scroll");
  modal.style.display = "flex";
  btnClose.focus();
}

// Fonction pour fermer la modal
function onCloseModal(btnOpen, modal) {
  main.setAttribute("aria-hidden", "false");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("no-scroll");
  modal.style.display = "none";
  btnOpen.focus();
}

// Fonction pour mettre le focus sur la modal
function focusModal(btn, modal, btnClose) {
  btn.addEventListener("click", () => {
    onOpenModal(btnClose, modal);
  });
}

// Fonction pour convertir les dates des médias
function convertDatesToNewDate(objects) {
  for (const object of objects) {
    object.date = new Date(object.date);
  }
}

// Fonction pour trier par nom
const sortByName = (liste) => liste.sort((a, b) => a.title.localeCompare(b.title));

// Fonction pour trier par nombre de likes
const sortByLike = (liste) => liste.sort((a, b) => b.likes - a.likes);

// Fonction pour trier par date
const sortByDate = (array) => {
  convertDatesToNewDate(array);
  return array.sort((a, b) => b.date - a.date);
};

// Fonction pour effectuer le tri
function sortAction(value, result) {
  if (value === "popularité") {
    sortByLike(result);
  } else if (value === "date") {
    sortByDate(result);
  } else if (value === "title") {
    sortByName(result);
  }
}

// Création du profil du photographe
function createProfil(data) {
  const logo = document.querySelector("body > header > nav > a > img");
  logo.setAttribute("alt", `Fisheye - Profil de ${data.name}`);
  logo.setAttribute("title", `Fisheye - Profil de ${data.name}`);

  const name = document.createElement("h1");
  name.innerText = data.name;

  const localisation = document.createElement("p");
  localisation.classList.add("localisation");
  localisation.innerText = `${data.city}, ${data.country}`;

  const bio = document.createElement("p");
  bio.classList.add("tagline");
  bio.innerText = data.tagline;

  const portrait = document.createElement("img");
  portrait.src = `/assets/photographers/Photographers_ID_Photos/${data.portrait}`;
  portrait.setAttribute("alt", data.name);
  portrait.setAttribute("title", data.name);

  const portraitBox = document.createElement("div");
  portraitBox.classList.add("portrait-box");

  const profilCard = document.createElement("div");
  profilCard.classList.add("profil-card");
  profilCard.appendChild(name);
  profilCard.appendChild(localisation);
  profilCard.appendChild(bio);
  section.insertBefore(profilCard, contactBtn);
  portraitBox.appendChild(portrait);
  section.appendChild(portraitBox);
}

// Fonction pour créer un élément de carousel
function createCarouselElement(data, author) {
  const mediaElement = data.image !== undefined ? document.createElement("img") : data.video !== undefined ? document.createElement("video") : null;

  if (mediaElement.tagName == "IMG") {
    mediaElement.src = `/assets/photographers/${author}/${data.image}`;
    mediaElement.alt = data.title;
  } else if (mediaElement.tagName == "VIDEO") {
    mediaElement.src = `/assets/photographers/${author}/${data.video}`;
    mediaElement.controls = true;
  }

  return mediaElement;
}

// Fonction pour afficher une image dans le carousel
function showImage(data, author, index) {
  let imageIndex = index;

  const initialMediaElement = createCarouselElement(data[imageIndex], author);

  if (initialMediaElement) {
    container.appendChild(initialMediaElement);

    const mediaElementTitle = document.createElement("p");
    mediaElementTitle.innerText = data[imageIndex].title;
    container.appendChild(mediaElementTitle);
  }

  prevBtn.addEventListener("click", () => {
    imageIndex = (imageIndex - 1 + data.length) % data.length;
    container.innerHTML = "";
    const mediaElement = createCarouselElement(data[imageIndex], author);
    if (mediaElement) {
      container.appendChild(mediaElement);

      const mediaElementTitle = document.createElement("p");
      mediaElementTitle.innerText = data[imageIndex].title;
      container.appendChild(mediaElementTitle);
    }
  });

  nextBtn.addEventListener("click", () => {
    imageIndex = (imageIndex + 1) % data.length;
    container.innerHTML = "";
    const mediaElement = createCarouselElement(data[imageIndex], author);
    if (mediaElement) {
      container.appendChild(mediaElement);
      const mediaElementTitle = document.createElement("p");
      mediaElementTitle.innerText = data[imageIndex].title;
      container.appendChild(mediaElementTitle);
    }
  });

  function navigateCarousel(event) {
    let mediaElement;
    switch (event.key) {
      case "ArrowLeft":
        imageIndex = (imageIndex - 1 + data.length) % data.length;
        container.innerHTML = "";
        mediaElement = createCarouselElement(data[imageIndex], author);
        if (mediaElement) {
          container.appendChild(mediaElement);
          const mediaElementTitle = document.createElement("p");
          mediaElementTitle.innerText = data[imageIndex].title;
          container.appendChild(mediaElementTitle);
        }
        break;
      case "ArrowRight":
        imageIndex = (imageIndex + 1) % data.length;
        container.innerHTML = "";
        mediaElement = createCarouselElement(data[imageIndex], author);
        if (mediaElement) {
          container.appendChild(mediaElement);
          const mediaElementTitle = document.createElement("p");
          mediaElementTitle.innerText = data[imageIndex].title;
          container.appendChild(mediaElementTitle);
        }
        break;
      default:
        return;
    }
  }
  document.addEventListener("keydown", navigateCarousel);
  return;
}

// Fonction pour vider un élément parent de ses enfants
function removeGallery(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

// Fonction pour gérer le clic sur un lien de la galerie
function handleLinkClick(media, data, author) {
  const value = sortBtn.value;
  const result = [...data];
  sortAction(value, result);
  const startIndex = result.findIndex((item) => item === media);
  removeGallery(container);
  showImage(result, author, startIndex);
}

// Récupération des médias
function getMedia(data) {
  const photographer = data.photographers.find((p) => p.id == photographerId);
  document.title = `Fisheye - ${photographer.name}`;
  document.querySelector('meta[name="description"]').content = `Découvrez le profil de ${photographer.name}, originaire de ${photographer.city}.`;

  if (photographer) {
    createProfil(photographer);
    const name = photographer.name.split(" ");
    nameModalContact.innerText = ` ${photographer.name}`;
    let numberLikes = 0;

    const dataMedia = data.media.filter((media) => media.photographerId == photographerId);

    function createGallery(data) {
      const gallery = document.querySelector(".gallery");

      data.forEach((media) => {
        if (media.image || media.video) {
          numberLikes += media.likes;

          const link = document.createElement("div");
          link.classList.add("link");

          const footerPhoto = document.createElement("div");
          footerPhoto.classList.add("description-photo");

          const namePhoto = document.createElement("label");
          namePhoto.innerText = media.title;
          namePhoto.setAttribute("for", `media${media.id}`);

          // Mis en place des likes
          const like = document.createElement("span");
          like.innerText = media.likes;
          const heart = document.createElement("span");
          heart.innerText = ` ♥️`;

          const likeContainer = document.createElement("a");
          likeContainer.setAttribute("tabindex", 0);
          const likeParse = media;

          likeContainer.appendChild(like);
          likeContainer.appendChild(heart);
          likeContainer.classList.add("like");

          likes.innerText = `${numberLikes} ♥️`;
          containerBottom.appendChild(likes);

          const likeMedia = () => {
            if (!likeParse.postLiker) {
              likeParse.likes += 1;
              likeParse.postLiker = true;
              like.innerText = media.likes;
              numberLikes += 1;
              likes.innerText = `${numberLikes} ♥️`;
            } else {
              likeParse.likes -= 1;
              likeParse.postLiker = false;
              like.innerText = media.likes;
              numberLikes -= 1;
              likes.innerText = `${numberLikes} ♥️`;
            }
          };
          // Avec la souris
          likeContainer.addEventListener("click", () => {
            likeMedia();
          });
          // Avec le clavier
          likeContainer.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
              likeMedia();
            }
          });
          // Mis en place des medias
          const photoContainer = document.createElement("a");
          photoContainer.classList.add("media");
          photoContainer.setAttribute("tabindex", 0);
          photoContainer.setAttribute("href", `#${media.id}`);
          photoContainer.setAttribute("title", media.title);

          const photoElement = media.image !== undefined ? document.createElement("img") : document.createElement("video");
          photoElement.setAttribute("id", `media${media.id}`);

          if (media.image !== undefined) {
            photoElement.src = `/assets/photographers/${name[0]}/${media.image}`;
            photoElement.setAttribute("alt", media.title);
            photoElement.setAttribute("title", media.title);
          } else if (media.video !== undefined) {
            photoElement.src = `/assets/photographers/${name[0]}/${media.video}`;
            photoElement.controls = false;
          }

          photoContainer.addEventListener("click", () => {
            const nametest = name[0];
            handleLinkClick(media, data, nametest);
            onOpenModal(btnCloseCarousel, bigContainer);
          });

          footerPhoto.appendChild(namePhoto);
          footerPhoto.appendChild(likeContainer);
          photoContainer.appendChild(photoElement);
          link.appendChild(photoContainer);
          link.appendChild(footerPhoto);
          gallery.appendChild(link);

          photoElement.addEventListener("error", () => {
            gallery.removeChild(link);
          });
        }
      });
    }

    sortByLike(dataMedia);
    createGallery(dataMedia);

    sortBtn.addEventListener("change", () => {
      const value = sortBtn.value;
      const result = [...dataMedia];
      sortAction(value, result);
      removeGallery(gallery);
      createGallery(result);
    });

    const price = document.createElement("p");
    price.innerText = `${photographer.price}€ / jour`;

    containerBottom.appendChild(price);
    document.body.appendChild(containerBottom);
  }
}

// Fonction asynchrone pour récupérer les données JSON
async function getData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }

    const data = await response.json();
    getMedia(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

// Appel de la fonction pour récupérer les données
getData(photographeUrl);

// Ajout d'un gestionnaire d'événement pour fermer le carousel
const closeBtnCarousel = document.querySelector(".close-btn");
closeBtnCarousel.addEventListener("click", () => {
  onCloseModal(closeBtnCarousel, bigContainer);
});

// Accessibilité modal

// Sélection des éléments pour la modal de contact
const contactForm = document.querySelector("#contact_modal");
const btnCloseContact = document.querySelector(".btn-close");

// Focus sur la modal de contact
focusModal(contactBtn, contactForm, btnCloseContact);

// Gestion de la fermeture de la modal de contact
btnCloseContact.addEventListener("click", () => {
  onCloseModal(contactBtn, contactForm);
});

// Ajout du focus sur les éléments de la galerie
const mediaSelect = document.querySelectorAll(".media");
mediaSelect.forEach((media) => {
  focusModal(media, bigContainer);
});

// Ajout d'un event listener pour la touche "Escape"
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && contactForm.style.display == "flex") {
    onCloseModal(contactBtn, contactForm);
  }
  if (event.key === "Escape" && bigContainer.style.display == "flex") {
    onCloseModal(closeBtnCarousel, bigContainer);
  }
});
