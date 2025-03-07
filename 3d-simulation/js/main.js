import * as THREE from 'three';
import { setupScene } from './sceneSetup.js';
import { createDriverEyes, createWindshield } from './elements.js';
import { LightManager } from './lightManagement.js';

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Get the main content container
  const container = document.getElementById('mainContent');
  
  // Set up scene, camera, renderer, and controls
  const { scene, camera, renderer, orbitControls } = setupScene(container);
  
  // Create driver eyes and windshield
  const driverEyeMesh = createDriverEyes(scene);
  const windshieldMesh = createWindshield(scene);
  
  // Create light manager
  const lightManager = new LightManager(
    scene, 
    camera, 
    renderer, 
    driverEyeMesh, 
    windshieldMesh, 
    orbitControls
  );
  
  // Add initial light source
  lightManager.addLightSource();
  
  // Add event listeners for UI controls
  document.getElementById('addLight').addEventListener('click', () => {
    lightManager.addLightSource();
  });
  
  document.getElementById('deleteLight').addEventListener('click', () => {
    lightManager.removeLightSource();
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Update shades based on light positions
    lightManager.updateShades();
    
    // Update controls
    orbitControls.update();
    
    // Render scene
    renderer.render(scene, camera);
  }
  
  // Start animation loop
  animate();
}); 