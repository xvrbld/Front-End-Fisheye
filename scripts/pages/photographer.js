//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById() {
    let paramsUrlProfile = new URLSearchParams(window.location.search);
    let id = paramsUrlProfile.get('id');
    console.log(id);
    await fetch("./data/photographers.json")
	.then(reponse => reponse.json())
	.then((data) => (photographers = data.photographers))
    console.log(photographers);
    const photographer = photographers.find(item => item.id == id);
    console.log(photographer);

    await fetch("./data/photographers.json")
	.then(reponse => reponse.json())
	.then((data) => (medias = data.medias))
    const mediasPhotographer = medias.filter(item => item.photographerId == id);
    console.log(mediasPhotographer);
}

getPhotographerById();