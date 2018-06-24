window.onload = function() {
    
    const game = CreateGame("canvas")
    const timestamp = () => {
        return window.performance && 
            window.performance.now ? 
            window.performance.now() : 
            new Date().getTime()
    }

    noise.seed(1);
    
    const terrain = CreateTerrain(game)

    const mainLoop = () => {
        let ctx = game.ctx
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