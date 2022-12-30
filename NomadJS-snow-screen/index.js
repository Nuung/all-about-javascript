'use strict';

const TOTAL_DURATION_CNT = 200;
const MIN_DURATION = 10;

/**
 * snow animation이 있는 snow div dom 생성 후 리턴
 * @param {number} duration snow action 지속될 시간
 * @returns HTMLDivElement
 */
const makeSnowFlakeDiv = (duration) => {
    const snowDiv = document.createElement("div");
    const delay = Math.random() * 10;
    const initialOpacity = Math.random(); // from 0 to 1 (float)

    snowDiv.classList.add("snowflake");
    snowDiv.style.left = `${Math.random() * window.screen.width}px`;
    snowDiv.style.animationDelay = `${delay}s`;
    snowDiv.style.opacity = initialOpacity;
    snowDiv.style.animation = `fall ${duration}s linear`;
    return snowDiv
};

/**
 * snow dom을 append 해서 실제 snowing action을 보여줌
 * @param {HTMLElementTagNameMap} wrapper snow action 이 추가될 parent dom
 * @returns null
 */
const snowAction = (wrapper) => {
    const bodyDom = (wrapper) ? wrapper : document.querySelector("body");
    const duration = Math.random() * 20 + MIN_DURATION;
    const snowDiv = makeSnowFlakeDiv(duration);
    bodyDom.appendChild(snowDiv);

    // remove from the memory
    setTimeout(() => {
        bodyDom.removeChild(snowDiv);
        snowAction();
    }, (duration + delay) * 1000);
}

// ==============================================================================
// MAIN Function
// ==============================================================================

window.onload = () => {
    for (let i = 0; i < TOTAL_DURATION_CNT; i++) {
        setTimeout(snowAction, 500 * i);   
    }
};