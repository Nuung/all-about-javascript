'use strict';

function loadItems() {
    return fetch('https://raw.githubusercontent.com/Nuung/all-about-javascript/master/ShoppingGame/data/data.json')
        .then(response => response.json())
        .then(json => json.items);
}

function createHTMLString(item) {
    // console.log(item);
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>        
    `;
}

function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// main -> promise가 전달해줘야행~ 
loadItems()
    .then(items => {
        console.log(items);
        displayItems(items);
        // document(items);
        // setEventListeners(items);
    })
    .catch(console.log);