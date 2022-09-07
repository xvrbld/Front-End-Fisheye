var mediasSave;
var mediasSaveOrder;
var lightboxIsOpen = false;

// Affiche les datas
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

// Affiche les médias
async function displayMedias(mediasPhotographer) {
  mediasSaveOrder = mediasPhotographer;
  const gallery = document.getElementById("gallery");
  let mediasHtml = "";
  let nbLikesTotal = 0;
  let i = 0;
  mediasPhotographer.map((media) => {
    nbLikesTotal += media.likes;
    let imageOrVideo;
    if (media.image) {
      imageOrVideo = `<a onclick="openLightbox(${media.id},${i})" href="javascript:void(0)"><img class="sample-photo" src="assets/photos/${media.image}" /></a>`;
    } else {
      imageOrVideo = `<a onclick="openLightbox(${media.id},${i})" href="javascript:void(0)"><video class="sample-photo" src="assets/photos/${media.video}"></video></a>`;
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
    i++;
  });
  gallery.innerHTML = mediasHtml;
  document.getElementById("likesTotal").innerText = nbLikesTotal;
}

// Ouvre la lightbox avec les datas du média
async function openLightbox(mediaId, index) {
  localStorage.setItem("mediaIndex", index);
  const media = mediasSave.find((m) => m.id == mediaId);
  document.querySelector(".lightbox").style.display = "block";
  document.querySelector(".slide_name").innerText = media.title;
  let imageOrVideo;
  if (media.image) {
    imageOrVideo = `<img src="assets/photos/${media.image}" />`;
  } else {
    imageOrVideo = `<video controls src="assets/photos/${media.video}"></video>`;
  }
  document.querySelector(".img_or_video_lightbox").innerHTML = imageOrVideo;
  lightboxIsOpen = true;
}

// Ferme la lightbox
async function closeLightbox() {
  document.querySelector(".lightbox").style.display = "none";
  lightboxIsOpen = false;
}

// Média suivant
async function next() {
  let index = localStorage.getItem("mediaIndex");
  const nbMedias = mediasSaveOrder.length;
  index++;
  if (index == nbMedias) {
    index = 0;
  }
  const media = mediasSaveOrder[index];
  openLightbox(media.id, index);
}

// Média précédent
async function previous() {
  let index = localStorage.getItem("mediaIndex");
  const nbMedias = mediasSaveOrder.length - 1;
  index--;
  if (index == -1) {
    index = nbMedias;
  }
  const media = mediasSaveOrder[index];
  openLightbox(media.id, index);
}

// Lightbox/Média keyboard
document.addEventListener("keydown", (key) => {
  if (lightboxIsOpen) {
    if (key.code == "Escape") {
      closeLightbox();
    } else if (key.code == "ArrowLeft") {
      previous();
    } else if (key.code == "ArrowRight") {
      next();
    }
  }
});

// Ajoute les likes
async function addLike(el) {
  let nbLikes = parseInt(el.querySelector(".likes").innerText);
  nbLikes++;
  el.querySelector(".likes").innerText = nbLikes;
  let nbLikesTotal = parseInt(document.getElementById("likesTotal").innerText);
  nbLikesTotal++;
  document.getElementById("likesTotal").innerText = nbLikesTotal;
}

// Cherche + Attribute photographe ID à l'url
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

// Ouvre dropdown des filtres
function openDropdown() {
  document.querySelector(".dropdown").style.display = "block";
}

// Ferme dropdown des filtres
function closeDropdown() {
  document.querySelector(".dropdown").style.display = "none";
}

// Filtres par popularité + date + titre
function filterBy(type) {
  if (type == "popularity") {
    document.querySelector(".activeFilter").innerText = "Popularité";
    mediasSave.sort(function (a, b) {
      return b.likes - a.likes;
    });
    displayMedias(mediasSave);
  }

  if (type == "date") {
    document.querySelector(".activeFilter").innerText = "Date";
    mediasSave.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
    displayMedias(mediasSave);
  }

  if (type == "title") {
    document.querySelector(".activeFilter").innerText = "Titre";
    mediasSave.sort((a, b) => a.title.localeCompare(b.title));
    displayMedias(mediasSave);
  }
  document.querySelector(".dropdown").style.display = "none";
}

getPhotographerById();
