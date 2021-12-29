precision mediump float;

varying float vRandom;


// uniform mat4 projectionMatrix;
// uniform mat4 modelMatrix;
// uniform mat4 viewMatrix;

void main(){
    gl_FragColor = vec4(vRandom, -0.2*vRandom, 0.4, 1.);
}