var width
var height
var tileWidth
var tileHeight
// const arrow = document.getElementById("direction")
window.onload = function() {
    
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
    tileWidth = Math.floor(0.8 * (width/10))
    tileHeight = Math.floor(tileWidth / 2)

    // document.getElementById('download').addEventListener('click', function() {
    //     downloadCanvas(this, 'canvas', 'terrain.png');
    // }, false);

    // function downloadCanvas(link, canvasId, filename) {
    //     link.href = document.getElementById(canvasId).toDataURL('image/png');
    //     // link.download = filename;
    // }

    const KEY_CODES = {
        13:"enter",
        32:"space", 
        37:"left", 
        38:"up", 
        39:"right", 
        40:"down",
        65:"a",
        80:"p",
        81:"q",
        83:"s",
        87:"w",
        88:"x",
        90:"z",
    }
    const keys = {}
    const timestamp = () => {
        return window.performance && 
            window.performance.now ? 
            window.performance.now() : 
            new Date().getTime()
    }
    window.addEventListener('keydown', function (e) {
        // console.log(e.keyCode)
        if (KEY_CODES[e.keyCode]) {
            keys[KEY_CODES[e.keyCode]] = true
            e.preventDefault()
        }
    }, false)
    window.addEventListener('keyup', function (e) {
        if (KEY_CODES[e.keyCode]) {
            keys[KEY_CODES[e.keyCode]] = false
            e.preventDefault()
        }
    }, false)
    canvas.onmousedown = function (e) {
        // console.log("mouse down")
        // console.log("canvas x: " + e.layerX)
        // console.log("canvas y: " + e.layerY)
    }
    canvas.onmouseup = function (e) {
        // console.log("mouse up")
        // state.canvas.ontouchstart = function (e) {}
        // state.canvas.ontouchend = function (e) {}
    }
    canvas.ontouchstart = (e) => {
        e.preventDefault()
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (x > width/2 && y > height/2)
            keys['s'] = true
        else if (x < width/2 && y < height/2)
            keys['q'] = true
        else {
            keys['s'] = false
            keys['q'] = false
        } 
        if (x > width/2 && y < height/2)
            keys['w'] = true
        else if (x < width/2 && y > height/2)
            keys['a'] = true
        else {
            keys['w'] = false
            keys['a'] = false
        }
        console.log("touch start")
    }
    canvas.ontouchend = (e) => {
        e.preventDefault()
        console.log("touch end")
        keys['w'] = false
        keys['a'] = false
        keys['s'] = false
        keys['q'] = false
    }
    canvas.ontouchcancel = (e) => {
        e.preventDefault()
        console.log("touch cancel")
        keys['w'] = false
        keys['a'] = false
        keys['s'] = false
        keys['q'] = false
    }

    noise.seed(1);
    
    const terrain = CreateTerrain(ctx, keys)

    const mainLoop = () => {
        ctx.save()
        ctx.translate(0,0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore()

        terrain.step()
        terrain.draw()
        requestAnimationFrame(mainLoop)
    }

    mainLoop()

}   