document.addEventListener("DOMContentLoaded", function () {
    setInterval(secondPlay, 1000);
    setInterval(minutePlay, 10000);
});


const flipAnimation = (ulTarget) => {
    document.body.classList.remove("play");
    let activeLi = document.querySelector(`${ulTarget} li.active`);

    if (!activeLi) {
        activeLi = document.querySelector(`${ulTarget} li`);
        if (activeLi) {
            activeLi.classList.add("before");
            activeLi.classList.remove("active");
            let nextLi = activeLi.nextElementSibling;
            if (nextLi) {
                nextLi.classList.add("active");
            }
            document.body.classList.add("play");
        }
    }
    else if (!activeLi.nextElementSibling) {
        let lis = document.querySelectorAll(`${ulTarget} li`);
        lis.forEach(li => li.classList.remove("before"));
        activeLi.classList.add("before");
        activeLi.classList.remove("active");
        activeLi = document.querySelector(`${ulTarget} li`);
        if (activeLi) {
            activeLi.classList.add("active");
            document.body.classList.add("play");
        }
    }
    else {
        let lis = document.querySelectorAll(`${ulTarget} li`);
        lis.forEach(li => li.classList.remove("before"));
        activeLi.classList.add("before");
        activeLi.classList.remove("active");
        let nextLi = activeLi.nextElementSibling;
        if (nextLi) {
            nextLi.classList.add("active");
            document.body.classList.add("play");
        }
    }
}




const secondPlay = () => {
    flipAnimation("ul.secondPlay");
}

const minutePlay = () => {
    flipAnimation("ul.minutePlay");
}
