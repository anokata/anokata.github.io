
window.addEventListener("load", init);
window.colorschemes = ['color1', 'color2'];
window.colorscheme = 0;

function scrollPaper() {
    var paper = document.querySelector(".paper");
    if (paper)
        paper.style.height = "40rem";
}

function init() {
    setTimeout(scrollPaper, 400);
}

function change_colorscheme(scheme) {
    var elements = document.getElementsByClassName('colorscheme');
    oldscheme = window.colorschemes[window.colorscheme];
    window.colorscheme = (window.colorscheme + 1) % window.colorschemes.length;
    scheme = window.colorschemes[window.colorscheme];
    for (var i in elements) {
        if (elements.hasOwnProperty(i)) {
            elements[i].classList.toggle(oldscheme);
            elements[i].classList.toggle(scheme);
        }
    }
}

//window.addEventListener("load", init);
function initFade() {
    window._fade = 0.01;
    var canva = document.getElementById("can");
    canva.style.zIndex = 1;
    setTimeout(fadeOut, 50);
}
function fade() {
    var canva = document.getElementById("can");
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
    var w = canva.width;
    var h = canva.height;
    var ctx = canva.getContext("2d");
    ctx.fillStyle="rgba(10,10,10, " + window._fade + ")";
    ctx.fillRect(0,0,w,h);
}
function fadeOut() {
    if (window._fade < 1.0) {
        window._fade += 0.05;
        fade();
        setTimeout(fadeOut, 5);
    } 
}
