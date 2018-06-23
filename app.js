window.onload = function() {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight
    const tileWidth = 100
    const tileHeight = 50

    noise.seed(Math.random());
    
    const getShades = (hue, sat, lightness) => {
        const lHigh = lightness || 60
        const lMed = lightness || 40
        const lLow = lightness || 20
        sat = sat || 100
        return {
            high: "hsl(" + hue + "," + sat + "%," + lHigh + "%)",
            med: "hsl(" + hue + "," + sat + "%," + lMed + "%)",
            low: "hsl(" + hue + "," + sat + "%," + lLow + "%)",
        }
    }

    let t = 0

    const mainLoop = () => {
        const maxHeight = 3
        ctx.save()
        ctx.translate(0,0)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.restore()
        t += 0.1
        for(let x=0; x < 10; ++x){
            for(let y=0; y < 10; ++y){
                // let height = (noise.simplex3(x/10,y/10, t) + 1)/2 * maxHeight
                let height = (noise.simplex2((x+t)/20,(y+t)/20) + 1)/2 * maxHeight
                let drawLeft = true
                let drawRight = true
                if ((x+1) < 10){
                    let heightR = (noise.simplex2((x+1+t)/20,(y+t)/20) + 1)/2 * maxHeight
                    if (height < heightR)
                        drawRight = false
                }
                    
                if ((y+1) < 10){
                    let heightL = (noise.simplex2((x+t)/20,(y+1+t)/20) + 1)/2 * maxHeight
                    if (height < heightL)
                        drawLeft = false
                }
                    
                let shades = getShades(58 - height*58/maxHeight)
                drawBlock(x, y, height, shades, drawLeft, drawRight)
            }
        }    
        requestAnimationFrame(mainLoop)
    }


    function drawBlock(x, y, z, shades, drawLeft, drawRight) {

        shades = shades || getShades(0, 0)
        drawLeft = (drawLeft === undefined) ? true : drawLeft
        drawRight = (drawRight === undefined) ? true : drawRight
        const top = shades.high
        const right = shades.med
        const left = shades.low

        ctx.save()
        ctx.translate(width / 2, 150)
        ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2)         

        ctx.beginPath()
        ctx.moveTo(0,-z * tileHeight)
        ctx.lineTo(tileWidth / 2, tileHeight / 2 - z * tileHeight)
        ctx.lineTo(0, tileHeight - z * tileHeight)
        ctx.lineTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight)
        ctx.closePath()
        ctx.fillStyle = top
        ctx.fill()

        if (drawLeft){
            ctx.beginPath()
            ctx.moveTo(-tileWidth/2, tileHeight/2 - z*tileHeight)
            ctx.lineTo(0, tileHeight - z*tileHeight)
            ctx.lineTo(0, tileHeight)
            ctx.lineTo(-tileWidth/2, tileHeight/2)
            ctx.closePath()
            ctx.fillStyle = left
            ctx.fill()
        }

        if (drawRight){
            ctx.beginPath()
            ctx.moveTo(tileWidth/2, tileHeight/2 - z*tileHeight)
            ctx.lineTo(0, tileHeight - z*tileHeight)
            ctx.lineTo(0, tileHeight)
            ctx.lineTo(tileWidth/2, tileHeight/2)
            ctx.closePath()
            ctx.fillStyle = right
            ctx.fill()
        }

        ctx.restore()
    }

    function drawTile(x, y, color) {
        ctx.save()
        ctx.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2)

        ctx.beginPath()
        ctx.moveTo(0,0)
        ctx.lineTo(tileWidth / 2, tileHeight / 2)
        ctx.lineTo(0, tileHeight)
        ctx.lineTo(-tileWidth / 2, tileHeight / 2)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()



        ctx.restore()
    }



    mainLoop()

}   