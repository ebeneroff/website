// var width = 1000;
// var height = 800;
var particles = new Particles();
particles.initialize();
var controller = new Controller(particles);
var unif_time, start;
var gl;
var canvas;

window.onload = function() {
    canvas = document.querySelector("#glCanvas");
    window.focus("#glCanvas");
    // canvas.width = document.body.clientWidth;
    // canvas.height = document.body.clientHeight;
    // console.log(canvas.width, canvas.height)

    // Initialize the GL context
    gl = canvas.getContext("webgl");

    // var ext = gl.getExtension('OES_texture_float');

    // Only continue if WebGL is available and working
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    // Initialize the shaders
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

    // // Set clear color to black, fully opaque
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // // Clear the color buffer with specified clear color
    // gl.clear(gl.COLOR_BUFFER_BIT);

    // Look up the locations that WebGL assigned to our inputs
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor')
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
    };

    var buffers = initBuffers(gl);

    drawScene(gl, programInfo, buffers);
}

var col = new Float32Array(controller.particles.num_particles * 3)
for(var i = 0; i < controller.particles.num_particles; i+=3) {
    rand = controller.particles.randomLookup()
    col[i] = rand + .25;
    col[i + 1] = rand + .25;
    col[i + 2] = rand + .25;
}
// col.fill(.6)

function render() {
    // update velocities
    controller.particles.update();

    gl.clear(gl.COLOR_BUFFER_BIT);

    if(controller.particles.size > 0) {
        gl.bufferData(gl.ARRAY_BUFFER, controller.particles.particles, gl.STATIC_DRAW);
        gl.drawArrays(gl.POINTS, 0, controller.particles.size/2);

        // gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);
    }

    window.requestAnimationFrame(render);
}

function drawScene(gl, programInfo, buffers) {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers[1])
    gl.vertexAttribPointer(programInfo.attribLocations.vertexColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers[0])
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    gl.useProgram(programInfo.program);
    unif_time = gl.getUniformLocation(programInfo.program, "T");
    
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    gl.disable(gl.DEPTH_TEST);
    
    gl.clearColor(0, 0, 0, 1);
    
    if (!window.requestAnimationFrame) 
        window.requestAnimationFrame = setTimeout;
    
    render();
}

function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, controller.particles.particles, gl.STATIC_DRAW);
    
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, col, gl.STATIC_DRAW);

    return [positionBuffer, colorBuffer];
}

// Initialize a shader program, so WebGL knows how to draw our data
function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
  
    // Create the shader program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
  
    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }
  
    return shaderProgram;
  }

  // Creates a shader of the given type, uploads the source and
  // compiles it.
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
  
    // Send the source to the shader object
    gl.shaderSource(shader, source);
  
    // Compile the shader program
    gl.compileShader(shader);
  
    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
  
    return shader;
  }