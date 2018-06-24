const CreateGame = (canvasId) => {
    const canvas = document.getElementById(canvasId),
          ctx = canvas.getContext('2d'),
          maxX = canvas.width = window.innerWidth,
          maxY = canvas.height = window.innerHeight,
          tileWidth = Math.floor(0.8 * (maxX/10)),
          tileHeight = Math.floor(tileWidth / 2),
          keys = {}
        
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
    canvas.ontouchstart = (e) => {
        e.preventDefault()
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (x > maxX/2 && y > maxY/2)
            keys['s'] = true
        else if (x < maxX/2 && y < maxY/2)
            keys['q'] = true
        else {
            keys['s'] = false
            keys['q'] = false
        } 
        if (x > maxX/2 && y < maxY/2)
            keys['w'] = true
        else if (x < maxX/2 && y > maxY/2)
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
    canvas.onmousedown = function (e) {}
    canvas.onmouseup = function (e) {}

    return {
        "_type": "game",
        canvas,
        ctx,
        maxX,
        maxY,
        tileWidth,
        tileHeight,
        keys
    }
}