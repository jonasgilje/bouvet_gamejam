const TICKS_PER_S = 25;
let drawTimeout;
const canvasEl = document.querySelector("canvas");
const drawCtx = canvasEl.getContext("2d");


const pineappleEmoji = "🍍";

function main() {

    drawCtx.font = "40px serif";
    drawCtx.textAlign = "center";
    drawCtx.textBaseline = "middle";
    
    draw();
}

function draw() {

    drawTimeout = setTimeout(draw, 1000/TICKS_PER_S);

    const randomX = Math.random() * canvasEl.width, 
        randomY = Math.random() * canvasEl.height;
    
    drawCtx.fillText(pineappleEmoji, randomX, randomY);
}

main()