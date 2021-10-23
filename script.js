const TICKS_PER_S = 25;
const PINEAPPLE_SPAWN_RATE = 60;
let drawTimeout;
const canvasEl = document.querySelector("canvas");
const drawCtx = canvasEl.getContext("2d");


const pineappleEmoji = "🍍";
let tickCounter = 0;

function main() {

    drawCtx.font = "40px serif";
    drawCtx.textAlign = "center";
    drawCtx.textBaseline = "middle";
    
    draw();
}

function draw() {
    if (tickCounter % PINEAPPLE_SPAWN_RATE == 0) {
        const randomX = Math.random() * canvasEl.width, 
            randomY = Math.random() * canvasEl.height;
    
        drawCtx.fillText(pineappleEmoji, randomX, randomY);
    }
    




    tickCounter++;
    drawTimeout = setTimeout(draw, 1000/TICKS_PER_S);
}

main()