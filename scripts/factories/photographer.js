// Créé + Attribue les éléments HTML
// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const link = document.createElement("a");
    link.href = `photographer.html?id=${id}`;
    img.setAttribute("src", picture);
    img.setAttribute("class", "img");
    img.setAttribute("alt", `${name}`);
    link.appendChild(img);
    const h2 = document.createElement("h2");
    h2.setAttribute("class", "name");
    h2.textContent = name;
    link.appendChild(h2);
    const location = document.createElement("p");
    location.setAttribute("class", "city");
    location.textContent = `${city}, ${country}`;
    const taglineEl = document.createElement("p");
    taglineEl.setAttribute("class", "tagline");
    taglineEl.textContent = tagline;
    const priceTag = document.createElement("p");
    priceTag.setAttribute("class", "price");
    priceTag.textContent = `${price}€/jour`;
    article.appendChild(link);
    article.appendChild(location);
    article.appendChild(taglineEl);
    article.appendChild(priceTag);
    return article;
  }
  return { name, picture, getUserCardDOM };
}