function photographerFactory(data) {
    const { name, portrait, city , country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const location = document.createElement ( 'span' );
        location.textContent = city , country;
        const taglineEl = document.createElement ( 'span' );
        taglineEl.textContent = tagline;
        const priceTag = document.createElement ( 'span' );
        priceTag.textContent = price;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(location);
        article.appendChild(taglineEl);
        article.appendChild(priceTag);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

