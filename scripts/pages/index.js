// Cherche les datas
async function getPhotographers() {
  const res = await fetch("data/photographers.json");
  return res.json();
}

// Intégre les datas au DOM
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    // eslint-disable-next-line no-undef
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

// Affiche les datas
async function init() {
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
