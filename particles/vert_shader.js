// Vertex shader program
const vsSource = 
`precision highp float;
attribute vec2 aVertexPosition; 
attribute vec3 aVertexColor;
varying vec2 V; 
uniform float T;
varying lowp vec3 vColor;

void main(void) {
gl_Position = vec4(aVertexPosition.x, aVertexPosition.y, 0, 1.);
gl_PointSize = 1.2;
vColor = aVertexColor;
}`;