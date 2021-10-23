const TICKS_PER_S = 25,
    PARALLAX_SCALAR = 30;
let drawTimeout, tickCounter = 0, score = 0;

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

let playerclass = {
    emoji: "👨‍🚀",
    size: 50,
    x: canvasEl.width / 2,
    y: canvasEl.height - 50,
    v_x: 0,
    v_y: 0,
    mouse_x: canvasEl.width / 2,
    mouse_y: 0,
    angle: 0,
    speed: 10
}


function main() {
    document.querySelector("button")
        .addEventListener("click", e => {
            e.target.style = "display:none;";
            clearTimeout(drawTimeout);
        });

    canvasEl.addEventListener("mousemove", e => {
        const rect = canvasEl.getBoundingClientRect();
        const mouse_x = e.clientX - rect.left,
            mouse_y = e.clientY - rect.top,
            angle = Math.atan2( (playerclass.y - mouse_y) , (playerclass.x - mouse_x))
        playerclass = Object.assign(playerclass, {mouse_x, mouse_y, angle})
    });

    canvasEl.addEventListener("click", () => {
        const { angle, speed } = playerclass;
        playerclass.v_x -= speed * Math.cos(angle)
        playerclass.v_y -= speed * Math.sin(angle)
    });

    drawCtx.textAlign = "center";
    drawCtx.textBaseline = "middle";

    // add 20 starting stars   
    for (let i = 0; i < 20; i++) masterclass.star.objects.push( {
            size: randintinrange(masterclass.star.sizes),
            x: randintinrange({max: canvasEl.width}),
            y: randintinrange({max: canvasEl.height})
        } );
    
    draw();
}

function draw() {

    // draw objects
    drawCtx.fillStyle = "black";
    drawCtx.fillRect(0, 0, canvasEl.width, canvasEl.height);

    Object.values(masterclass).forEach( c => 
        c.objects.forEach( e => {
            drawCtx.font = e.size + "px serif";
            drawCtx.fillText(c.emoji, e.x, e.y);
        } ));

    // draw player
    drawCtx.save()
    drawCtx.translate(playerclass.x, playerclass.y);
    drawCtx.rotate(playerclass.angle - Math.PI / 2);
    drawCtx.font = playerclass.size + "px serif";
    drawCtx.fillText(playerclass.emoji, 0, 0);
    drawCtx.restore();

    // spawn
    Object.values(masterclass)
        .filter( c => tickCounter % c.spawnRate == 0)
        .map( c => ({ c, x: randintinrange( {max: canvasEl.width} ),
                        y: randintinrange(c.spawnArea),
                        s: randintinrange(c.sizes) }))
        .forEach( t => 
            t.c.objects.push( { x: t.x, y: t.y, size: t.s } ));
    
        
    // off-screen logic
    Object.values(masterclass).forEach( c => {
        for (let i = c.objects.length - 1; i >= 0; i--) {
            // add to y pos in acc. with parallax scalar.
            y_pos = (c.objects[i].y += c.objects[i].size / PARALLAX_SCALAR); 

            // delete if off screen
            if (y_pos > canvasEl.height) c.objects.splice(i, 1);
        }
    });

    // move player
    (() => {
        let {x, y, v_x, v_y} = playerclass;
        x += v_x;              y += v_y;
        v_x *= 0.95;           v_y *= 0.95;
        let v_x_sgn = Math.sign(v_x), v_y_sgn = Math.sign(v_y);
        v_x -= 0.2 * v_x_sgn;  v_y -= 0.2 * v_y_sgn;
        if (v_x * v_x_sgn < 0) v_x = 0;  if (v_y * v_y_sgn < 0) v_y = 0;
        
        playerclass = Object.assign(playerclass, {x, y, v_x, v_y});
    })()

    // check collisions with pumpkins and pineapples every 3rd frame
    if (tickCounter % 3 == 0) {
        for (const obj of masterclass.pumpkin.objects) {
            const dx = Math.abs(obj.x - playerclass.x),
                dy = Math.abs(obj.y - playerclass.y),
                sizedist = (obj.size + playerclass.size) / 2;
            
            // optimization
            if ((dx + dy) > sizedist) continue;

            const ctc = Math.sqrt(
                Math.pow(dx, 2) +
                Math.pow(dy, 2)
            );

            if (ctc < sizedist) return;
        }

        for (let i = masterclass.pineapple.objects.length - 1; i >= 0; i--) {
            const obj = masterclass.pineapple.objects[i];
            const dx = Math.abs(obj.x - playerclass.x),
                dy = Math.abs(obj.y - playerclass.y),
                sizedist = (obj.size + playerclass.size) / 2;
            
            if ((dx + dy) > sizedist) continue;

            const ctc = Math.sqrt(
                Math.pow(dx, 2) +
                Math.pow(dy, 2)
            );

            if (ctc > sizedist + 10) continue;

            masterclass.pineapple.objects.splice(i, 1);
            console.log("score:", ++score);
        }
    }

    tickCounter++;  
    drawTimeout = setTimeout(draw, 1000/TICKS_PER_S);
}


function randintinrange({max, min = 0}) {
    return Math.floor(min + Math.random() * (max - min));
}

main()