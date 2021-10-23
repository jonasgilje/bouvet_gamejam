const TICKS_PER_S = 25;
const PINEAPPLE_SPAWN_RATE = 30;
let drawTimeout;
const canvasEl = document.querySelector("canvas");
const drawCtx = canvasEl.getContext("2d");


const pineappleEmoji = "🍍";
let tickCounter = 0;
const pineappleList = [];

function main() {
    document.querySelector("button")
        .addEventListener("click", e => {
            e.target.style = "display:none;";
            clearTimeout(drawTimeout);
        });

    drawCtx.font = "40px serif";
    drawCtx.textAlign = "center";
    drawCtx.textBaseline = "middle";
    
    draw();
}

function draw() {

    // draw

    pineappleList.forEach(t => drawCtx.fillText(pineappleEmoji, t[0], t[1]));

    // spawn

    if (tickCounter % PINEAPPLE_SPAWN_RATE == 0) {
        const randomX = Math.random() * canvasEl.width, 
            randomY = Math.random() * canvasEl.height;
    
        pineappleList.push([randomX, randomY]);
    }
    
    // logic

    const toRemove = [];

    for (let i = pineappleList.length - 1; i >= 0; i--) {
        if ((pineappleList[i][1] += 1) > 400) {
            pineappleList.splice(i, 1);
        }
    }
    
    tickCounter++;  

    drawTimeout = setTimeout(draw, 1000/TICKS_PER_S);
}

main()