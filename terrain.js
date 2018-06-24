const TerrainStep = function(){
    if (this.keys['s']){
        this.mvx = 0.1
    } else if (this.keys['q']){
        this.mvx = -0.1
    } else 
        this.mvx = 0
    if (this.keys['w']){
        this.mvy = -0.1
    } else if (this.keys['a']){
        this.mvy = 0.1
    } else
        this.mvy = 0
    this.mx += this.mvx
    this.my += this.mvy
}

const getShades = (hue, sat, lightness) => {
    const lHigh = lightness || 60
    const lMed = lightness || 40
    const lLow = lightness || 20
    sat = sat || 100
    hue = hue % 360
    return {
        high: "hsl(" + hue + "," + sat + "%," + lHigh + "%)",
        med: "hsl(" + hue + "," + sat + "%," + lMed + "%)",
        low: "hsl(" + hue + "," + sat + "%," + lLow + "%)",
    }
}

const drawBlock = function(game, x, y, z, shades, drawLeft, drawRight) {
    const ctx = game.ctx

    shades = shades || getShades(0, 0)
    drawLeft = (drawLeft === undefined) ? true : drawLeft
    drawRight = (drawRight === undefined) ? true : drawRight
    const top = shades.high
    const right = shades.med
    const left = shades.low

    ctx.save()
    ctx.translate(game.maxX / 2, 200)
    ctx.translate((x - y) * game.tileWidth / 2, (x + y) * game.tileHeight / 2)         

    ctx.beginPath()
    ctx.moveTo(0,-z * game.tileHeight)
    ctx.lineTo(game.tileWidth / 2, game.tileHeight / 2 - z * game.tileHeight)
    ctx.lineTo(0, game.tileHeight - z * game.tileHeight)
    ctx.lineTo(-game.tileWidth / 2, game.tileHeight / 2 - z * game.tileHeight)
    ctx.closePath()
    ctx.fillStyle = top
    ctx.fill()

    if (drawLeft){
        ctx.beginPath()
        ctx.moveTo(-game.tileWidth/2, game.tileHeight/2 - z*game.tileHeight)
        ctx.lineTo(0, game.tileHeight - z*game.tileHeight)
        ctx.lineTo(0, game.tileHeight)
        ctx.lineTo(-game.tileWidth/2, game.tileHeight/2)
        ctx.closePath()
        ctx.fillStyle = left
        ctx.fill()
    }

    if (drawRight){
        ctx.beginPath()
        ctx.moveTo(game.tileWidth/2, game.tileHeight/2 - z*game.tileHeight)
        ctx.lineTo(0, game.tileHeight - z*game.tileHeight)
        ctx.lineTo(0, game.tileHeight)
        ctx.lineTo(game.tileWidth/2, game.tileHeight/2)
        ctx.closePath()
        ctx.fillStyle = right
        ctx.fill()
    }

    ctx.restore()
}

const TerrainDraw = function(){
    for(let x=0; x < this.gridSize; ++x){
        for(let y=0; y < this.gridSize; ++y){
            // let height = (noise.simplex3(x/10,y/10, t) + 1)/2 * maxHeight
            let height = (noise.simplex2((x+this.mx)/20,(y+this.my)/20) + 1)/2 * this.maxHeight
            let drawLeft = true
            let drawRight = true
            if ((x+1) < this.gridSize){
                let heightR = (noise.simplex2((x+1+this.mx)/20,(y+this.my)/20) + 1)/2 * this.maxHeight
                if (height < heightR)
                    drawRight = false
            }
                
            if ((y+1) < this.gridSize){
                let heightL = (noise.simplex2((x+this.mx)/20,(y+1+this.my)/20) + 1)/2 * this.maxHeight
                if (height < heightL)
                    drawLeft = false
            }
                
            let shades = getShades(250 - height*50/this.maxHeight)
            drawBlock(this.game, x, y, height, shades, drawLeft, drawRight)
        }
    }  
}

const CreateTerrain = (game) => {
    const t = {
        "_type": "Terrain",
        game: game,
        ctx: game.ctx,
        keys: game.keys,
        maxHeight: 5,
        gridSize: 10,
        mx: 0,
        my: 0,
        mvx: 0,
        mvy: 0,
    }

    return Object.assign(t, {
        draw: TerrainDraw,
        step: TerrainStep
    })
}    