var mediasSave;
var mediasSaveOrder;
var lightboxIsOpen = false;

// Attribue + Affiche les datas
async function displayData(photographer) {
  document.getElementById("name").innerText = photographer.name;
  document.getElementById(
    "location"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  document.getElementById("tagline").innerText = photographer.tagline;
  const picture = `assets/photographers/${photographer.portrait}`;
  document.getElementById("photographer-profile").src = picture;
  document.getElementById("photographer-profile").alt = `${photographer.name}`;
  document.getElementById("price").innerText = `${photographer.price}€ / jour`;
}

// Affiche les medias
async function displayMedias(mediasPhotographer) {
  mediasSaveOrder = mediasPhotographer;
  const gallery = document.getElementById("gallery");
  // Definis les likes à 0
  let mediasHtml = "";
  let nbLikesTotal = 0;
  let i = 0;

  //  Additionne likes aux totaux + lightbox click
  mediasPhotographer.map((media) => {
    nbLikesTotal += media.likes;
    let imageOrVideo;
    if (media.image) {
      imageOrVideo = `<a onclick="openLightbox(${media.id},${i})" href="javascript:void(0)"><img class="sample-photo" src="assets/photos/${media.image}" alt="${media.title}, closeup view" /></a>`;
    } else {
      imageOrVideo = `<a onclick="openLightbox(${media.id},${i})" href="javascript:void(0)"><video class="sample-photo" src="assets/photos/${media.video}" alt="${media.title}, closeup view"></video></a>`;
    }
    // Attribue HTML infos aux médias + ajout likes click
    mediasHtml =
      mediasHtml +
      `<div class="photo-card">
        ${imageOrVideo}
        <div class="desc">
          <p>${media.title}</p>
          <a onclick="addLike(this)" href="javascript:void(0)"><span class="likes">${media.likes}</span><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
          </svg>
          </a>
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
    imageOrVideo = `<img src="assets/photos/${media.image}" alt="${media.title}" />`;
  } else {
    imageOrVideo = `<video controls src="assets/photos/${media.video}" alt="${media.title}"></video>`;
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
// eslint-disable-next-line no-unused-vars
async function addLike(el) {
  let nbLikes = parseInt(el.querySelector(".likes").innerText);
  nbLikes++;
  el.querySelector(".likes").innerText = nbLikes;
  let nbLikesTotal = parseInt(document.getElementById("likesTotal").innerText);
  nbLikesTotal++;
  document.getElementById("likesTotal").innerText = nbLikesTotal;
}

// Cherche + Attribue photographe ID à l'url
async function getPhotographerById() {
  let paramsUrlProfile = new URLSearchParams(window.location.search);
  let id = paramsUrlProfile.get("id");
  /* eslint-disable */
  await fetch("./data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (photographers = data.photographers));

  const photographer = photographers.find((item) => item.id == id);

  await fetch("./data/photographers.json")
    .then((reponse) => reponse.json())
    .then((data) => (medias = data.medias));
  const mediasPhotographer = medias.filter((item) => item.photographerId == id);
  mediasSave = medias.filter((item) => item.photographerId == id);
  /* eslint-enable */
  await displayData(photographer);
  await displayMedias(mediasPhotographer);
}

// Ouvre dropdown des filtres
// eslint-disable-next-line no-unused-vars
function openDropdown() {
  document.querySelector(".dropdown").style.display = "block";
}

// Ferme dropdown des filtres
// eslint-disable-next-line no-unused-vars
function closeDropdown() {
  document.querySelector(".dropdown").style.display = "none";
}

// Filtres par popularité + date + titre
// eslint-disable-next-line no-unused-vars
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
