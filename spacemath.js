window.addEventListener("load", init);
var ctx;
var width, height;
var ui={};
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
    initUI();
    canva.onclick = onClick;
}

function initUI() {
    ui.buttons = [];
    makeButton(100, 100, 130, 30, 'Начать', 'blue', 'red', start);
    makeButton(300, 100, 130, 30, '1Начать', 'red', 'red');
    makeButton(100, 300, 130, 30, '2Начать', 'green', 'red');
    makeButton(300, 300, 130, 30, '3Начать', 'black', 'red');
}

function start() {
    console.log("start!");
}

function onClick(e) {
    let x = e.x;
    let y = e.y;

    ui.buttons.forEach(function (b) {
        if (inBox(x, y, b)) {
            console.log(x, y, b);
            b.active = true;
            b.click();
            setTimeout(deactivate, 200, b);
        }
    });
}

function deactivate(b) {
    b.active = false;
}

function inBox(x, y, b) {
    if (x > b.x && x < b.x + b.w)
        if (y > b.y && y < b.y + b.h)
            return true;
    return false;
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

    drawButtons();
}

function drawButtons() {
    ui.buttons.forEach(function (b) {
        if (b.active) {
            ctx.fillStyle = b.activeColor;
        } else {
            ctx.fillStyle = b.color;
        }
        ctx.textAlign = "center";
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = "#fff";
        let cx = b.x + b.w/2;
        let cy = b.y + b.h/2 + 5;
        ctx.fillText(b.label, cx, cy);
    });
}

function makeButton(x, y, w, h, label, color, activeColor, click) {
    if (!click) {
        click = function () {};
    }
    let button = {
        'x': x,
        'y': y,
        'w': w,
        'h': h,
        'label': label,
        'color': color,
        'activeColor': activeColor,
        'click': click,

        'active': false,
    };
    ui.buttons.push(button);
}
