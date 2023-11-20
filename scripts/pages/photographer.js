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
// Bandeau Bottom
var containerBottom = document.createElement("div");
containerBottom.classList.add("container-bottom");
const likes = document.createElement("p");
likes.classList.add("footer-add");
// Variable pour compter les images dans la galerie
let imageIndex = 0;

// Fonction pour convertir les dates des médias
function convertDatesToNewDate(objects) {
  for (const object of objects) {
    object.date = new Date(object.date);
  }
}

// Fonction pour trier par nom
function sortByName(liste) {
  return liste.sort((a, b) => a.title.localeCompare(b.title));
}

// Fonction pour trier par nombre de likes
function sortByLike(liste) {
  return liste.sort((a, b) => b.likes - a.likes);
}

// Fonction pour trier par date
function sortByDate(array) {
  convertDatesToNewDate(array);
  return array.sort((a, b) => b.date - a.date);
}

// Function pour affectuer le tri
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

//
function createCarouselElement(data, author) {
  const mediaElement = data.image !== undefined ? document.createElement("img") : data.video !== undefined ? document.createElement("video") : null;

  if (mediaElement.tagName == "IMG") {
    mediaElement.src = `/assets/photographers/${author}/${data.image}`;
    mediaElement.alt = data.title;
  } else if (mediaElement.tagName == "VIDEO") {
    mediaElement.src = `/assets/photographers/${author}/${data.video}`;
    mediaElement.alt = data.title;
    mediaElement.controls = true;
  }

  return mediaElement;
}

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
    console.log(imageIndex);
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
    console.log(imageIndex);
    container.innerHTML = "";
    const mediaElement = createCarouselElement(data[imageIndex], author);
    if (mediaElement) {
      container.appendChild(mediaElement);
      const mediaElementTitle = document.createElement("p");
      mediaElementTitle.innerText = data[imageIndex].title;
      container.appendChild(mediaElementTitle);
    }
  });
  return;
}

function removeGallery(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}
//

function handleLinkClick(media, data, author) {
  // Utilisez la data associée à la div .link
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

  if (photographer) {
    createProfil(photographer);
    const name = photographer.name.split(" ");
    nameModalContact.innerText = photographer.name;
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

          const namePhoto = document.createElement("p");
          namePhoto.innerText = media.title;

          // Mis en place des likes
          const like = document.createElement("span");
          like.innerText = media.likes;
          const heart = document.createElement("span");
          heart.innerText = ` ♥️`;

          const likeContainer = document.createElement("p");
          const likeParse = media;

          likeContainer.appendChild(like);
          likeContainer.appendChild(heart);
          likeContainer.classList.add("like");

          likes.innerText = `${numberLikes} ♥️`;
          containerBottom.appendChild(likes);

          likeContainer.addEventListener("click", () => {
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
          });
          // Mis en place des medias
          const photoElement = media.image !== undefined ? document.createElement("img") : document.createElement("video");

          photoElement.setAttribute("alt", media.title);
          photoElement.setAttribute("tabindex", imageIndex);

          if (media.image !== undefined) {
            photoElement.src = `/assets/photographers/${name[0]}/${media.image}`;
          } else if (media.video !== undefined) {
            photoElement.src = `/assets/photographers/${name[0]}/${media.video}`;
            photoElement.setAttribute("type", "video/mp4");
            photoElement.controls = false;
          }

          photoElement.addEventListener("click", () => {
            const nametest = name[0];
            handleLinkClick(media, data, nametest);
            bigContainer.style.display = "flex";
            bigContainer.focus();
          });

          footerPhoto.appendChild(namePhoto);
          footerPhoto.appendChild(likeContainer);
          link.appendChild(photoElement);
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

getData(photographeUrl);

const closeBtnCarousel = document.querySelector(".close-btn");
closeBtnCarousel.addEventListener("click", () => {
  bigContainer.style.display = "none";
});
