import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Creates and configures the Three.js scene, camera, renderer, and lighting
 * @param {HTMLElement} container - DOM element to attach the renderer to
 * @returns {Object} - Object containing the created scene, camera, renderer, and controls
 */
export function setupScene(container) {
  // Create scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x333333);

  // Create camera
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
  camera.position.set(0, 5, 25);

  // Create renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // Create lighting
  setupLighting(scene);

  // Create controls
  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  orbitControls.dampingFactor = 0.1;

  // Set up window resize handler
  setupResizeHandler(camera, renderer);

  return { scene, camera, renderer, orbitControls };
}

/**
 * Sets up the scene lighting
 * @param {THREE.Scene} scene - The scene to add lights to
 */
function setupLighting(scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(10, 10, 10);
  scene.add(dirLight);
}

/**
 * Sets up handler for window resize events
 * @param {THREE.PerspectiveCamera} camera - The camera to update on resize
 * @param {THREE.WebGLRenderer} renderer - The renderer to resize
 */
function setupResizeHandler(camera, renderer) {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
} 