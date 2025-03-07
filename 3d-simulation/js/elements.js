import * as THREE from 'three';

/**
 * Creates and adds the driver's eyes to the scene
 * @param {THREE.Scene} scene - The scene to add the driver's eyes to
 * @returns {THREE.Mesh} - The created driver's eyes mesh
 */
export function createDriverEyes(scene) {
  const driverEyeMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x008000 })
  );
  driverEyeMesh.position.set(0, 1.5, -2);
  scene.add(driverEyeMesh);
  
  return driverEyeMesh;
}

/**
 * Creates and adds the windshield to the scene
 * @param {THREE.Scene} scene - The scene to add the windshield to
 * @returns {THREE.Mesh} - The created windshield mesh
 */
export function createWindshield(scene) {
  const windshieldMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 5),
    new THREE.MeshStandardMaterial({
      color: 0x0000ff,
      opacity: 0.2,
      transparent: true,
      side: THREE.DoubleSide
    })
  );
  windshieldMesh.position.set(0, 1.5, 0);
  scene.add(windshieldMesh);
  
  return windshieldMesh;
} 