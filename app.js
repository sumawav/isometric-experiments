const timestamp = () => {
    return window.performance && 
        window.performance.now ? 
        window.performance.now() : 
        new Date().getTime()
}
var g



document.getElementById("info").addEventListener("click", (e) => {
    e.preventDefault();
    let detail = document.getElementById("info-detail")
    let display = detail.style.display
    if (display === "block"){
        detail.style.display = "none"
    } else {
        detail.style.display = "block"
    }
    
})

window.onload = function() {
    
    const game = CreateGame("canvas")
    g = game

    noise.seed(1);
    
    const terrain = CreateTerrain(game)
    terrain.cruiseControl = true
    terrain.cruiseMvx = 0
    terrain.cruiseMvy = -0.1

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