document.addEventListener("DOMContentLoaded", function () {
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener("click", function () {
        document.body.classList.toggle("black-theme");
    });


    // 사용자 시스템 테마가 어두운 테마로 설정되어 있음
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        const isBlack = document.body.classList.contains("black-theme");
        if (!isBlack) {
            document.body.classList.toggle("black-theme");
        }
    }
});
