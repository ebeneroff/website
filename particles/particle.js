// TODO: Make these global
var width = canvas.width;
var height = canvas.height;
var gravity = vec2.fromValues(0, -.001);
var maxLUTSize = 1e6;

var Particles = function(){
    this.num_particles = 2000000;
    this.size = 10000;
    this.particles = new Float32Array(this.num_particles * 2);
    this.velocities = new Float32Array(this.num_particles * 2);
    this.randomLUT = [];
    this.randomIndex = 0;
}

Particles.prototype.initialize = function() {
    for(var i = 0; i < maxLUTSize; i++) {
        this.randomLUT[i] = Math.random();
    }

    for(var i = 0; i < this.size; i++) {
        this.particles[i] = this.randomLookup() - this.randomLookup();
        this.velocities[i] = (this.randomLookup() - this.randomLookup())*.0001;
    }
}

Particles.prototype.randomLookup = function () {
    if(this.randomIndex > maxLUTSize) {
        this.randomIndex = 0;
    }
    
    return this.randomLUT[this.randomIndex++];
}

function convertToWorldX(x) {
    return (x/width) * 2 - 1;
}

function convertToWorldY(y) {
    return (1 - y/height) * 2 - 1;
}

function getGridSpaceXY(x, y) {
    let X = Math.floor((x + 1) * 4);
    let Y = Math.floor((1 - y) * 4);
    // console.log(x, y)
    return {x:X, y:Y}
}

function getGridPos(x, y) {
    // console.log(x + 4 * y)
    return x + 8*y
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1))
}

Particles.prototype.add = function(x, y, num) {
    let size = this.size;
    // let max_size = this.num_particles;
    let f = this.particles;
    let v = this.velocities;

    // resize array
    if(this.size + num*2 > this.num_particles) {
        f = new Float32Array(this.num_particles + num*2);
        v = new Float32Array(this.num_particles + num*2);
        this.num_particles += num * 2;

        // copy over data
        for(var i = 0; i < size + num*2; i++) {
            f[i] = this.particles[i];
            v[i] = this.velocities[i]
        }
    }
    else if(this.size == 0) {
        f = new Float32Array(this.num_particles);
        v = new Float32Array(this.num_particles);
    }
    
    // generate random data for added particles
    for(var i = 0; i < num * 2; i+= 2) {
        f[size + i] = this.randomLookup() - this.randomLookup();
        f[size + i + 1] = this.randomLookup() - this.randomLookup();
        v[size + i] = (this.randomLookup() - this.randomLookup())*.001;
        v[size + i + 1] = (this.randomLookup() - this.randomLookup())*.001;

        // add particles at mouse click
        if(x != undefined && y != undefined) {
            // console.log(x, y)
            // console.log(convertToWorldX(x), convertToWorldY(y))
            f[size + i] = convertToWorldX(x) + (this.randomLookup() - this.randomLookup())*.2;
            f[size + i + 1] = convertToWorldY(y) + (this.randomLookup() - this.randomLookup())*.2;
            v[size + i] = (this.randomLookup() - this.randomLookup())*.001;
            v[size + i + 1] = (this.randomLookup() - this.randomLookup())*.001;
        }
    }

    this.size += num * 2;
    // this.num_particles += num * 2;
    this.particles = f;
    this.velocities = v;
}

Particles.prototype.drag = function(x, y, xprev, yprev, num, coefficient) {
    let p = num * 2

    let X = convertToWorldX(x)
    let Y = convertToWorldY(y)
    let Xprev = convertToWorldX(xprev)
    let Yprev = convertToWorldY(yprev)
    for(var i = 0; i < this.size; i+=2) {
        let x = this.particles[i]
        let y = this.particles[i + 1]
        let b1 = .1 - (this.randomLookup() - this.randomLookup())*.1;
        let b2 = .1 - (this.randomLookup() - this.randomLookup())*.1;

        if(x - b1 < Xprev && x + b1 > Xprev && y - b2 < Yprev && y + b2 > Yprev) {
            this.velocities[i] += ((X - (Xprev + (this.randomLookup() - this.randomLookup())*.01))) * coefficient;
            this.velocities[i + 1] += (Y - (Yprev + (this.randomLookup() - this.randomLookup())*.01)) * coefficient;
        }
    }
}

Particles.prototype.update = function() {
    for(var i = 0; i < this.size; i+= 2) {
        // if(this.particles[i] <= -.95 || this.particles[i] >= .95) {
        //     this.velocities[i] = this.velocities[i] * -.5 + ((this.randomLookup()-this.randomLookup())*.001)
        //     this.particles[i] += this.velocities[i]
        //     this.particles[i + 1] += this.velocities[i + 1];
        // }
        // else if(this.particles[i+1] <= -.95 || this.particles[i+1] >= .95) {
        //     this.particles[i] += this.velocities[i];
        //     this.velocities[i + 1] = this.velocities[i + 1] * -.5 + ((this.randomLookup()-this.randomLookup())*.001)
        //     this.particles[i + 1] += this.velocities[i + 1]
        // }
        // else {
        this.particles[i] += this.velocities[i];
        this.particles[i + 1] += this.velocities[i + 1];
        // }
    }
}

Particles.prototype.advect = function(x, y, ) {
    let X = convertToWorldX(x)
    let Y = convertToWorldY(y)
    
    for(var i = 0; i < this.size; i+=2) {
        let x1 = this.particles[i]
        let y1 = this.particles[i + 1]

        let d = dist(x1, y1, X, Y);
        if(d < .5) {
            if(X - x1 > 0) {
                this.velocities[i] -= .000001/d + (this.randomLookup() - this.randomLookup())*.0001;
            } 
            else {
                this.velocities[i] += .000001/d + (this.randomLookup() - this.randomLookup())*.0001;
            }
                
            if(Y - y1 > 0) {
                this.velocities[i + 1] -= .000001/d + (this.randomLookup() - this.randomLookup())*.0001;
            }
            else  {
                this.velocities[i + 1] += .000001/d + (this.randomLookup() - this.randomLookup())*.0001;
            }
            this.particles[i] += this.velocities[i]
            this.particles[i + 1] += this.velocities[i + 1]
        }
    }
}

Particles.prototype.remove = function(num) {

}

Particles.prototype.addColorIntensity = function() {

}

Particles.prototype.removeColorIntensity = function() {
    
}