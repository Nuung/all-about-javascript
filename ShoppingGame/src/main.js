'use strict';

function loadItems() {
    return fetch('./ data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

// main -> promise가 전달해줘야행~ 
loadItems()
    .then(items => {
        console.log(items);
        // document(items);
        // setEventListeners(items);
    })
    .catch(console.log);