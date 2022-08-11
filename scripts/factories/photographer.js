function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.setAttribute( 'class' , 'name');
        h2.textContent = name;
        const locCity = document.createElement ( 'span' );
        locCity.setAttribute( 'class' , 'city' );
        locCity.textContent = city;
        const locCountry = document.createElement ( 'span' );
        locCountry.setAttribute( 'class' , 'country' );
        locCountry.textContent = country;
        const taglineEl = document.createElement ( 'span' );
        taglineEl.setAttribute( 'class' , 'tagline' );
        taglineEl.textContent = tagline;
        const priceTag = document.createElement ( 'span' );
        priceTag.setAttribute( 'class' , 'price' );
        priceTag.textContent = price;
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(locCity);
        article.appendChild(locCountry);
        article.appendChild(taglineEl);
        article.appendChild(priceTag);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
