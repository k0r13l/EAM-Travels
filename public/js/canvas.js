var canvas = null, ctx = null, x = 1200, y = 0;
var img = new Image();
var contador = 0;

function paint(ctx) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    img.src = "public/img/canvas/"+ contador +".jpg";
    contador++;
    contador %= 8;


    ctx.drawImage(img, x, y);
}

function update() {
    x -= 4;
    if (x <= 0) {
        x = canvas.width;
    }
}

function run() {
    update();
    paint(ctx);
    window.setTimeout(run, 100);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    run();
}

window.addEventListener('load', init, false);
