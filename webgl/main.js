import "./style.css";

// Código del shader para los vértices
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

// Código para el shader del fragmento
const fragmentShaderText = [
  "precision mediump float;",
  "varying vec3 fragColor;",
  "uniform float screenWidth;",
  "void main(){",
  "  gl_FragColor = vec4(fragColor, 1.0);",
  "}",
].join("\n");

const canvas = document.getElementById("canvas"); // Elemento del canvas
canvas.width = 800;
canvas.height = 800;
const gl = canvas.getContext("webgl");
gl.viewport(0, 0, 800, 800); // Se crea el viewport de webgl

// Si WebGL no es soportado, se muestra un mensaje de alerta
if (!gl) {
  alert("WebGL not supported");
}

// Color de fondo
gl.clearColor(0.24, 0.24, 0.24, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); // Clears the color buffer to set the color

// Shader de los vértices
const vertexShader = gl.createShader(gl.VERTEX_SHADER);
// Shader de los fragmentos
const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
// Se añade el código del shader a la referencia de los shaders
gl.shaderSource(vertexShader, vertexShaderText);
gl.shaderSource(fragmentShader, fragmentShaderText);

// Se compilan los shaders
gl.compileShader(vertexShader);
// Si hay un error al compilar el shader de los vértices, se muestra un mensaje de error
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

// Programa de shaders
const program = gl.createProgram();
gl.attachShader(program, vertexShader); // Añade el vertexShader al programa
gl.attachShader(program, fragmentShader); // Añade el fragmentShader al programa
gl.linkProgram(program); // Se linkea el programa

// Ubicación de los vértices y color de los mismos
// Cada 5 valores es un vértice,
// los primeros 2 son la posición y los siguientes 3 son el color
const triangleVertices = [
  0.0, 0.435, 1.0, 0.0, 0.0, 
  -0.5, -0.435, 0.0, 1.0, 0.0, 
  0.5, -0.435, 0.0, 0.0, 1.0,
];

// Se crea un buffer para los vértices
const triangleVertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
// Se añade al buffer los vértices
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array(triangleVertices),
  gl.STATIC_DRAW,
);

// Se obtiene la ubicación de los atributos de los vértices
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

// Se obtiene el color de los atributos de los vértices
const colorAttribLocation = gl.getAttribLocation(program, "vertColor");
gl.vertexAttribPointer(
  colorAttribLocation,
  3,
  gl.FLOAT,
  gl.FALSE,
  5 * Float32Array.BYTES_PER_ELEMENT,
  2 * Float32Array.BYTES_PER_ELEMENT, // El color comienza en el 3er valor de los 5 del arreglo
);
gl.enableVertexAttribArray(colorAttribLocation);

// Se usa el programa de shaders
gl.useProgram(program);

// Dibuja el triángulo
gl.drawArrays(gl.TRIANGLES, 0, 3);
