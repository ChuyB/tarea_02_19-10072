import "./style.css";
import * as THREE from "three";

// Configuración del color y posición de la cámara
const bgColor = 0x1b1e2b;
const cameraPosition = 1;

// Se crea la escena, la cámara y se cambia el color de fondo
// de la escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(bgColor);
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = cameraPosition;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // Tamaño del renderizador

document.body.appendChild(renderer.domElement); // Se añade el renderizador al body

// Creación de la geometría
const triangleGeometry = new THREE.BufferGeometry();
// Posición de cada vértice del triángulo
const vertexArray = [
  -0.5, -0.435, 0,
  0.5, -0.435, 0,
  0, 0.435, 0
];
// Color de cada vértice del triángulo
const vertexColors = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];
// Se añade la posición y el color a la geometría
triangleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertexArray, 3));
triangleGeometry.setAttribute('vertColor', new THREE.Float32BufferAttribute(vertexColors, 3))

// Definición de los shaders
const triangleMaterial = new THREE.ShaderMaterial({
  vertexShader: `
  precision mediump float;
  attribute vec3 vertColor;
  varying vec3 fragColor;
  void main(){
    fragColor = vertColor;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `,
  fragmentShader: `
  precision mediump float;
  varying vec3 fragColor;
  void main(){
    gl_FragColor = vec4(fragColor, 1.0);
  }
  `,
  vertexColors: true
});

// Se crea el triángulo como un Mesh
const figure = new THREE.Mesh(triangleGeometry, triangleMaterial);
scene.add(figure); // Se añade el triángulo a la escena

// Loop de renderizado
renderer.setAnimationLoop(() => renderer.render(scene, camera));
