var canvas = document.querySelector("#glCanvas");
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
var mouse = {x:0, y:0}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

var Controller = function(particles) {
    this.mouse_down = false;
    this.particles = particles;
    this.canvas = document.querySelector("#glCanvas");

    document.body.onmousedown = function(e) { 
        // console.log("mouse down!");
        this.mouse_down = true;
        this.particles.advect(e.offsetX, e.offsetY)
        this.particles.add(e.offsetX, e.offsetY, 1000);
        
    }.bind(this)

    document.body.onmouseup = function(e) {
        // console.log("mouse up!");
        this.mouse_down = false;
        // this.particles.drag(e.offsetX, e.offsetY, 1000);
        mouse.x = 0
        mouse.y = 0
    }.bind(this)

    document.body.addEventListener('mousemove', function(e) {
        var mousePos = getMousePos(canvas, e);
        // console.log(evt)
        // if(this.mouse_down) 
        // {
            // this.particles.add(e.offsetX, e.offsetY, 100);
        this.particles.drag(mousePos.x, mousePos.y, mouse.x, mouse.y, 1000);
        mouse.x = mousePos.x
        mouse.y = mousePos.y
        // }
            
    }.bind(this), false)

    document.body.onkeydown = function(e) {
        if(e.key === "x") {
            console.log("destroying all particles!")
            this.particles.particles = new Float32Array(0);
            this.particles.velocities = new Float32Array(0);
            // this.particles.num_particles = 0;
            this.particles.size = 0;
        }
        if(e.key === " ") {
            this.particles.add(e.clientX, e.clientY, 10000);
        }
    }.bind(this)
}