import "./style.css";

// Vertex shader and fragment shader code
const vertexShaderText = [
  "precision mediump float;",
  "attribute vec2 vertPosition;",
  "attribute vec3 vertColor;",
  "varying vec3 fragColor;",
  "uniform float screenWidth;",
  "void main(){",
  "  fragColor = vertColor;",
  "  gl_Position = vec4(vertPosition, 0.0, 1.0);",
  "}",
].join("\n");
const fragmentShaderText = [
  "precision mediump float;",
  "varying vec3 fragColor;",
  "uniform float screenWidth;",
  "void main(){",
  "  gl_FragColor = vec4(fragColor, 1.0);",
  "}",
].join("\n");

// Gets the canvas element and the WebGL context
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gl = canvas.getContext("webgl");
gl.viewport(0, 0, window.innerWidth, window.innerHeight);

// If WebGL is not supported, alert the user
if (!gl) {
  alert("WebGL not supported");
}

// Sets canvas background color
gl.clearColor(0.24, 0.24, 0.24, 1.0); // Color is slate gray
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clears the color buffer to set the color

// Creates shaders, sets the source and compiles them
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(vertexShader, vertexShaderText);
gl.shaderSource(fragmentShader, fragmentShaderText);

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error(
    "ERROR compiling vertex shader!",
    gl.getShaderInfoLog(vertexShader),
  );
}
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error(
    "ERROR compiling fragment shader!",
    gl.getShaderInfoLog(fragmentShader),
  );
}

// Creates program, attach shaders, links and uses it
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// Sets triangle vertices coordinates
const triangleVertices = [
  0.0, 0.435, 1.0, 0.0, 0.0, 
  -0.5, -0.435, 0.0, 1.0, 0.0, 
  0.5, -0.435, 0.0, 0.0, 1.0,
];

const triangleVertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(triangleVertices),
  gl.STATIC_DRAW,
);

// Sets position attributes from the vertex buffer object
const positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
gl.vertexAttribPointer(
  positionAttribLocation,
  2,
  gl.FLOAT,
  gl.FALSE,
  5 * Float32Array.BYTES_PER_ELEMENT,
  0,
);
gl.enableVertexAttribArray(positionAttribLocation);

// Sets color attributes from the vertex buffer object
const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
gl.vertexAttribPointer(
  colorAttribLocation,
  3,
  gl.FLOAT,
  gl.FALSE,
  5 * Float32Array.BYTES_PER_ELEMENT,
  2 * Float32Array.BYTES_PER_ELEMENT, // Color is offset by 2 elements in the array
);
gl.enableVertexAttribArray(colorAttribLocation);

// Sets the shader program to use
gl.useProgram(program);

// Draws the triangle
gl.drawArrays(gl.TRIANGLES, 0, 3);
