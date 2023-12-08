function photographerTemplate(data, index) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;
  function getUserCardDOM() {
    //Content
    const article = document.createElement("article");
    const link = document.createElement("a");
    link.setAttribute("tabindex", index);
    link.href = "/photographer.html?id=" + id;
    const container = document.createElement("p");
    //Image
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photo de photographe");
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
