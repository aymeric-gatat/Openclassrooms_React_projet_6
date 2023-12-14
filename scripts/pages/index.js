"use strict";
// Cette fonction asynchrone est responsable de la récupération des données des photographes depuis un fichier JSON distant.
async function getPhotographers() {
  try {
    // Utilise la fonction Fetch pour obtenir les données du fichier JSON
    const response = await fetch("https://aymeric-gatat.github.io/Openclassrooms_React_projet_6/data/photographers.json");

    // Vérifie si la requête a réussi (statut HTTP 200)
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }

    // Analyse les données JSON de la réponse
    const data = await response.json();
    // Retourne les photographes sous forme d'objet
    return data;
  } catch (error) {
    // Gère les erreurs en cas d'échec de la requête
    console.error(error);
  }
}

// Cette fonction asynchrone affiche les données des photographes sur la page web
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");
  var index = 0;
  // Itère sur chaque photographe et crée un modèle de carte pour l'afficher sur la page
  photographers.forEach((photographer) => {
    index++;
    const photographerModel = photographerTemplate(photographer, index);
    const userCardDOM = photographerModel.getUserCardDOM();

    // Ajoute la carte de l'utilisateur à la section des photographes
    photographersSection.appendChild(userCardDOM);
  });
}

// Cette fonction d'initialisation est le point d'entrée du script.
async function init() {
  // Récupère les données des photographes en utilisant la fonction getPhotographers
  const { photographers } = await getPhotographers();

  // Affiche les données récupérées sur la page
  displayData(photographers);
}

// Appelle la fonction d'initialisation pour commencer l'exécution du script
init();
