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
        <span class="item__description">${item.gender}, ${item.size}, ${item.color}</span>
    </li>        
    `;
}

function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

// 버튼이 클릭될때마다 전체적으로 컨테이너가 업데이트 되어야 하는 문제가 있다 
// 전체적인 리스트 유지 후 -> filter class를 toggle하는 것이 퍼포먼스적으로 훨씬 이득이다
function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    // console.log(key, value);

    if (key == null || value == null) return;

    const filtered = items.filter((item) => item[key] === value);
    displayItems(filtered);
    // updateItems(key, value);
}

// function updateItems(key, value) {
//     const container = document.querySelector('.items');
//     const items = container.querySelectorAll('li');
//     items.forEach((item) => {
//         console.log(item, key, value);

//         // if (item.dataset[key] === value) item.classList.remove('invisible');
//         // else item.classList.add('invisible');
//     });
// }

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelectorAll('.buttons');
    const colorBtn = document.querySelectorAll('.colorBtn');
    logo.addEventListener('click', () => displayItems(items));
    buttons.forEach((button) => button.addEventListener('click', (event) => onButtonClick(event, items)));
    colorBtn.forEach((button) => button.addEventListener('click', (event) => onButtonClick(event, items)));
}

// main -> promise가 전달해줘야행~ 
loadItems()
    .then(items => {
        console.log(items);
        displayItems(items);
        setEventListeners(items);
        // document(items);
        // setEventListeners(items);
    })
    .catch("loadItems clear: " + console.log);