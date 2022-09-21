// eslint-disable-next-line no-unused-vars
function mediasFactory(media, i) {

    const { image, video, title, likes } = media;

  function getMediaDOM() {
    const divContainer = document.createElement("div");
    divContainer.setAttribute("class", "photo-card");

    let imageOrVideo;

    if (image) {
      imageOrVideo = document.createElement("a");
      imageOrVideo.href = "javascript:void(0)";
      imageOrVideo.setAttribute("onclick", `openLightbox(${media.id},${i})`);

      const img = document.createElement("img");
      img.setAttribute("src", `assets/photos/${image}`);
      img.setAttribute("alt", `${title}, closeup view`);
      img.setAttribute("class", "sample-photo");

      imageOrVideo.appendChild(img);
    } else {
      imageOrVideo = document.createElement("a");
      imageOrVideo.href = "javascript:void(0)";
      imageOrVideo.setAttribute("onclick", `openLightbox(${media.id},${i})`);

      const videoEl = document.createElement("video");
      videoEl.setAttribute("src", `assets/photos/${video}`);
      videoEl.setAttribute("alt", `${title}, closeup view`);
      videoEl.setAttribute("class", "sample-photo");

      imageOrVideo.appendChild(videoEl);
    }

    const desc = document.createElement("div");
    desc.setAttribute("class", "desc");

    const titleP = document.createElement("p");
    titleP.textContent = title;

    const likesLink = document.createElement("a");
    likesLink.href = "javascript:void(0)";
    likesLink.setAttribute("onclick", `addLike(this)`);

    const nbLikes = document.createElement("span");
    nbLikes.setAttribute("class", "likes");
    nbLikes.textContent = likes;

    const icon = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
        </svg>`;

    divContainer.appendChild(imageOrVideo);

    desc.appendChild(titleP);

    likesLink.appendChild(nbLikes);
    likesLink.innerHTML += icon;

    desc.appendChild(likesLink);

    divContainer.appendChild(desc);

    return divContainer;
  }
  return { getMediaDOM };
}
