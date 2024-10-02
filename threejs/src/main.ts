import "./style.css";
import * as THREE from "three";

// Settings
const bgColor = 0x1b1e2b;
const cameraPosition = 1;

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
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const triangleGeometry = new THREE.BufferGeometry();
const vertexArray = [
  -0.5, -0.435, 0,
  0.5, -0.435, 0,
  0, 0.435, 0
];
const vertexColors = [
  1, 0, 0,
  0, 1, 0,
  0, 0, 1
];
triangleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertexArray, 3));
triangleGeometry.setAttribute('vertColor', new THREE.Float32BufferAttribute(vertexColors, 3))

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

const figure = new THREE.Mesh(triangleGeometry, triangleMaterial);
scene.add(figure);

renderer.setAnimationLoop(() => renderer.render(scene, camera));
