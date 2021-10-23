const TICKS_PER_S = 25,
    //PINEAPPLE_SPAWN_RATE = 30,
    PARALLAX_SCALAR = 1;
let drawTimeout, tickCounter = 0;

const canvasEl = document.querySelector("canvas");
const drawCtx = canvasEl.getContext("2d");

const masterclass = {
    // the master data class for objects to be drawn on screen
    star: {
        emoji: "✨",
        objects: [],
        sizes: {min: 8, max: 22},
        spawnRate: 60,
        spawnArea: {min: -100, max: 0}
    },
    pineapple: {
        emoji: "🍍",
        objects: [],
        sizes: {min: 35, max: 45},
        spawnRate: 80,
        spawnArea: {min: -50, max: 200}
    },
    pumpkin: {
        emoji: "🎃",
        objects: [],
        sizes: {min: 30, max: 70},
        spawnRate: 30,
        spawnArea: {min: -100, max: 50}
    }
}


function main() {
    document.querySelector("button")
        .addEventListener("click", e => {
            e.target.style = "display:none;";
            clearTimeout(drawTimeout);
        });

    //drawCtx.font = "40px serif";
    drawCtx.textAlign = "center";
    drawCtx.textBaseline = "middle";
    
    draw();
}

function draw() {

    // draw
    drawCtx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    Object.values(masterclass).forEach( c => 
        c.objects.forEach( e => {
            drawCtx.font = e.size + "px serif";
            drawCtx.fillText(c.emoji, e.x, e.y);
        } ));

    // spawn

    Object.values(masterclass)
        .filter( c => tickCounter % c.spawnRate == 0)
        .map( c => ({ c, x: randintinrange( {max: canvasEl.width} ),
                        y: randintinrange(c.spawnArea),
                        s: randintinrange(c.sizes) }))
        .forEach( t => 
            t.c.objects.push( { x: t.x, y: t.y, size: t.s } ));
    
            /*
    if (tickCounter % pineappleCl.spawnRate == 0) {
        const x = Math.random() * canvasEl.width, 
            y = Math.random() * canvasEl.height,
            size = Math.random() * (pineappleSizeRange[1] - pineappleSizeRange[0]) + pineappleSizeRange[0];
    
        pineappleList.push({ x, y, size });
    }*/
    
    // logic
/*
    const toRemove = [];

    for (let i = pineappleList.length - 1; i >= 0; i--) {
        if ((pineappleList[i][1] += 1) > 400) {
            pineappleList.splice(i, 1);
        }
    }
    */
    tickCounter++;  

    drawTimeout = setTimeout(draw, 1000/TICKS_PER_S);
}


function randintinrange({max, min = 0}) {
    return Math.floor(min + Math.random() * (max - min));
}


main()