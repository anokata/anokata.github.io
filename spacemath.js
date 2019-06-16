window.addEventListener("load", init);
var ctx;
var width, height;
const CLEAR_COLOR = "#777";

function init() {
    var canva = document.getElementById("can");
    ctx = canva.getContext("2d");
    canva.style.zIndex = 1;
    canva.width = window.innerWidth;
    canva.height = window.innerHeight;
    width = canva.width;
    height = canva.height;
    requestAnimationFrame(drawAll);
    a=0;
    ctx.font = "20px mono";
}
function clear() {
    ctx.fillStyle = CLEAR_COLOR;
    ctx.fillRect(0,0,width, height);
}
function drawAll() {
    clear();
    draw();
    requestAnimationFrame(drawAll);
}
function draw() {
    a += 1;
    ctx.fillStyle = "#faf";
    ctx.fillRect(10,10,10+a,20);
    ctx.fillText("Начало", 20,120);
}
