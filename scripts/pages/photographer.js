//Mettre le code JavaScript lié à la page photographer.html
var mediasSave;


async function displayData(photographer) {
  document.getElementById("name").innerText = photographer.name;
  document.getElementById(
    "location"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  document.getElementById("tagline").innerText = photographer.tagline;
  const picture = `assets/photographers/${photographer.portrait}`;
  document.getElementById("photographer-profile").src = picture;
  document.getElementById("price").innerText = `${photographer.price}€ / jour`;
}

async function displayMedias(mediasPhotographer) {
  const gallery = document.getElementById("gallery");
  let mediasHtml = "";
  let nbLikesTotal = 0;
  mediasPhotographer.map((media) => {
    nbLikesTotal += media.likes;
    let imageOrVideo;
    if (media.image) {
      imageOrVideo = `<a href="javascript:void(0)"><img class="sample-photo" src="assets/photos/${media.image}" /></a>`;
    } else {
      imageOrVideo = `<a href="javascript:void(0)"><video class="sample-photo" src="assets/photos/${media.video}"></video></a>`;
    }

    mediasHtml =
      mediasHtml +
      `<div class="photo-card">
        ${imageOrVideo}
        <div class="desc">
          <p>${media.title}</p>
          <a onclick="addLike(this)" href="javascript:void(0)"><span class="likes">${media.likes}</span><i class="fa-solid fa-heart"></i></a>
        </div>
      </div>`;
  });
  gallery.innerHTML = mediasHtml;
  document.getElementById("likesTotal").innerText = nbLikesTotal;
}

async function addLike(el) {
  let nbLikes = parseInt(el.querySelector(".likes").innerText);
  nbLikes++;
  el.querySelector(".likes").innerText = nbLikes;
  let nbLikesTotal = parseInt(document.getElementById("likesTotal").innerText);
  nbLikesTotal++;
  document.getElementById("likesTotal").innerText = nbLikesTotal;
}

async function getPhotographerById() {
  let paramsUrlProfile = new URLSearchParams(window.location.search);
  let id = paramsUrlProfile.get("id");

  await fetch("./data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (photographers = data.photographers));

  const photographer = photographers.find((item) => item.id == id);


  await fetch("./data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (medias = data.medias));
  const mediasPhotographer = medias.filter((item) => item.photographerId == id);
  mediasSave = medias.filter((item) => item.photographerId == id);

  await displayData(photographer);
  await displayMedias(mediasPhotographer);
}

function openDropdown() {
  document.querySelector(".dropdown").style.display = "block";
}

function filterBy(type) {
  if (type == "popularity") {
    document.querySelector(".activeFilter").innerText = "Popularité";
    mediasSave.sort(function (a, b) {
      return a.likes - b.likes;
  });
  displayMedias(mediasSave);
  }

  if (type == "date") {
    document.querySelector(".activeFilter").innerText = "Date";
    mediasSave.sort(function (a, b) {
      return a.likes - b.likes;
  });
  displayMedias(mediasSave);
  }

  if (type == "title") {
    document.querySelector(".activeFilter").innerText = "Titre";
    mediasSave.sort(function (a, b) {
      return a.likes - b.likes;
  });
  displayMedias(mediasSave);
  }
  document.querySelector(".dropdown").style.display = "none";
}

getPhotographerById();
