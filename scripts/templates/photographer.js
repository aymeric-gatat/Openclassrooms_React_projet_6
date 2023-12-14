"use strict";
function photographerTemplate(data, index) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
  function getUserCardDOM() {
    //Content
    const article = document.createElement("li");
    const link = document.createElement("a");
    link.setAttribute("tabindex", index);
    link.href = "photographer.html?id=" + id;
    const container = document.createElement("footer");
    //Image
    const imgContainer = document.createElement("picture");
    imgContainer.className = "img-container";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `photo de photographe ${name}`);
    //Name
    const h2 = document.createElement("h2");
    h2.textContent = name;
    //Place
    const localisation = document.createElement("adress");
    localisation.className = "localisation";
    localisation.textContent = city + ", " + country;
    //Bio
    const bio = document.createElement("p");
    bio.textContent = tagline;
    //Price
    const tarif = document.createElement("b");
    tarif.textContent = price + "€/jour";

    imgContainer.appendChild(img);
    link.appendChild(imgContainer);
    link.appendChild(h2);
    container.appendChild(localisation);
    container.appendChild(bio);
    container.appendChild(tarif);
    article.appendChild(link);
    article.appendChild(container);

    return article;
  }
  return { name, picture, getUserCardDOM };
}
