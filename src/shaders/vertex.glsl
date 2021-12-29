
uniform mat4 projectionMatrix;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform float time;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;


void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	// modelPosition.y +=(sin(position.x * 50.0) * 5.21) * (sin(time));
	modelPosition.y += sin(aRandom) * sin(time * 0.5) *10.0;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;
	
	vRandom = aRandom * sin(time *.2);
gl_Position = projectedPosition;
}