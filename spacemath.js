window.addEventListener("load", init);
var ctx;
var width, height;
var ui={};
var game;
var gameInit={
    'number': 0,
    'addition': 0,
};
let firstX = 300;
let firstY = 30;
const CLEAR_COLOR = "#777";
const TEXT_COLOR = "#ddd";
const buttonH = 30;
const buttonW = 130;

function init() {
    game = gameInit;
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

function initUI() { // Создание интерфейса
    ui.buttons = [];
    let leftPan = 2;
    makeDefButton(firstX, firstY, text('+'), start);
    makeDefButton(leftPan, leftPan, text('reset'), reset);
    makeDefButton(leftPan, buttonH*1 + leftPan, text('save'), save);
    makeDefButton(leftPan, buttonH*2 + leftPan, text('load'), load);

    makeDefButton(firstX, firstY + buttonH*2, text('a++'), upgrade1);
}

function reset() {
    game=gameInit;
}

function start() {
    console.log("start!");
    game.number += 1;
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
    ctx.fillText("N = " + game.number, firstX + buttonW / 2, firstY - 5);
    ctx.fillText("a = " + game.addition, firstX + buttonW / 2, firstY*3 - 5);

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

function makeDefButton(x, y, label, click) {
    return makeButton(x, y, buttonW, buttonH, label, '#555', "#888", "#aaa", click);
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

function upgrade1() {
    // price
    game.addition += 1;
}
