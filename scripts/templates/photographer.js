function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

  function getUserCardDOM() {
    //Content
    const article = document.createElement("article");
    const link = document.createElement("a");
    const container = document.createElement("p");
    //Image
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photo de " + name);
    //Name
    const h2 = document.createElement("h2");
    h2.textContent = name;
    //Place
    const localisation = document.createElement("span");
    localisation.textContent = city + ", " + country;
    //Bio
    const bio = document.createElement("span");
    bio.textContent = tagline;
    //Price
    const tarif = document.createElement("span");
    tarif.textContent = price + "€/jour";

    link.appendChild(img);
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
