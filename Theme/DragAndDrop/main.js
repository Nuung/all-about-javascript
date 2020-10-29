
// static and grolbal val area
const listItemsArr = document.querySelectorAll('.list-item');
const listsArr = document.querySelectorAll('.list');

let draggedItem = null;

//------------------------------------------------------------------//
// function area

const init = () => {
    listItemsArr.forEach(item => {
        item.addEventListener('dragstart', (event) => {
            draggedItem = event.target;
            item.style.border = '2.5px solid black';
            // item.classList.toggle('grabbable');
            setTimeout(() => {
                item.display = 'none';
            }, 0);
        });
 
        item.addEventListener('dragend', (event) => {
            item.style.border = '';
            // item.classList.toggle('grabbable');
            setTimeout(() => {
                item.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });

    listsArr.forEach(list => {
        // 기본 드레그 액션들 다 제거해주자 
        list.addEventListener('dragover', (event) => { event.preventDefault(); });
        list.addEventListener('dragenter', (event) => { 
            event.preventDefault(); 
            list.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        });
        list.addEventListener('dragleave', (event) => {
            list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
        list.addEventListener('drop', (event) => {
            list.append(draggedItem);
            list.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        });
    }); 
}

// for (let i = 0; i < listItemsArr.length; i++) {
//     const item = listItemsArr[i];
//     for (let j = 0; j < listsArr; j++) {
//         const list = listsArr[j];    
//     }
// }

//------------------------------------------------------------------//
// Main, Start area
init();