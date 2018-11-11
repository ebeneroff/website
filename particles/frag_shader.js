// Fragment shader program
const fsSource = 
`precision highp float; 
varying vec2 V; 
uniform float T;
varying lowp vec3 vColor;
void main(void) {
    // gl_FragColor = vec4(1.0 + vColor.r, .3 + (V.y * .1) + vColor.g, .3 + (V.x * .1) + vColor.b, 1);
    gl_FragColor = vec4(vColor, 1);
}`;