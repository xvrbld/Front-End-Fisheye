// Cherche les datas
async function getPhotographers() {
  const res = await fetch("./data/photographers.json");
  return res.json();
}

// Affiche les datas
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Récupère les datas
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
