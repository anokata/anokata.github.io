window.addEventListener("load", init);
var ctx;
var width, height;
var ui={};
var game={
    'number': 0,
};
let firstX = 300;
let firstW = 130;
let firstY = 30;
const CLEAR_COLOR = "#777";
const TEXT_COLOR = "#ddd";

function init() {
    load();
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
    canva.onmousedown = onClick;
}

function initUI() {
    ui.buttons = [];
    makeDefButton(firstX, firstY, firstW, 30, text('+'), start);
    makeDefButton(2, 2, 70, 30, text('reset'), reset);
}

function reset() {
    game={
        'number': 0,
    };
}

function start() {
    console.log("start!");
    game.number += 1;
    save();
}

function onClick(e) {
    let x = e.x;
    let y = e.y;

    ui.buttons.forEach(function (b) {
        if (inBox(x, y, b)) {
            // console.log(x, y, b);
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
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText("" + game.number, firstX + firstW / 2, firstY - 5);

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
        ctx.strokeStyle = b.frameColor;
        ctx.lineWidth = 3;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeRect(b.x, b.y, b.w, b.h);
        ctx.fillStyle = "#fff";
        let cx = b.x + b.w/2;
        let cy = b.y + b.h/2 + 5;
        ctx.fillText(b.label, cx, cy);
    });
}

function makeButton(x, y, w, h, label, color, activeColor, frameColor, click) {
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
        'frameColor': frameColor,
        'click': click,

        'active': false,
    };
    ui.buttons.push(button);
}

function makeDefButton(x, y, w, h, label, click) {
    return makeButton(x, y, w, h, label, '#555', "#888", "#aaa", click);
}

function text(t) {
    dict = {
        "1": "1",
    }
    return  dict[t] || t;
}

function save() {
    Cookies.set("game", btoa(JSON.stringify(game)));
}

function load() {
    let g = Cookies.get("game");
    if (g) {
        console.log(g);
        console.log(JSON.parse(atob(g)));
        game = JSON.parse(atob(g));
    }
}
