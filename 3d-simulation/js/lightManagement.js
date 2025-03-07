import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';
import { linePlaneIntersection, computeShadingRadius, updatePlaneFromMesh } from './utils.js';

/**
 * LightManager class to handle light sources and shading
 */
export class LightManager {
  constructor(scene, camera, renderer, driverEyeMesh, windshieldMesh, orbitControls) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.driverEyeMesh = driverEyeMesh;
    this.windshieldMesh = windshieldMesh;
    this.orbitControls = orbitControls;
    
    // Initialize arrays and materials
    this.lightsources = [];
    this.shades = [];
    this.windshieldPlane = new THREE.Plane();
    
    // Materials
    this.lightMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
    this.shadeMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      opacity: 0.5,
      transparent: true,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: 1
    });
    
    // Initialize drag controls
    this.dragControls = new DragControls(this.lightsources, camera, renderer.domElement);
    this.setupDragControls();
  }
  
  /**
   * Set up drag controls event listeners
   */
  setupDragControls() {
    this.dragControls.addEventListener('dragstart', () => this.orbitControls.enabled = false);
    this.dragControls.addEventListener('dragend', () => this.orbitControls.enabled = true);
  }
  
  /**
   * Update drag controls when light sources change
   */
  updateDragControlsObjects() {
    this.dragControls.dispose();
    this.dragControls = new DragControls(this.lightsources, this.camera, this.renderer.domElement);
    this.setupDragControls();
  }
  
  /**
   * Add a new light source and its shade
   */
  addLightSource() {
    // Create light source (yellow sphere)
    const sphereGeom = new THREE.SphereGeometry(0.7, 32, 32);
    const lightMesh = new THREE.Mesh(sphereGeom, this.lightMaterial);
    lightMesh.position.set(2 + this.lightsources.length * 1.5, 1.5, 10);
    this.scene.add(lightMesh);
    this.lightsources.push(lightMesh);

    // Create shade (black cylinder)
    const cylinderGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.1, 32);
    const shadeMesh = new THREE.Mesh(cylinderGeom, this.shadeMaterial);
    shadeMesh.visible = false;
    this.scene.add(shadeMesh);
    this.shades.push(shadeMesh);

    this.updateDragControlsObjects();
  }
  
  /**
   * Remove the last added light source and its shade
   */
  removeLightSource() {
    if (this.lightsources.length === 0) return;
    
    const lightToRemove = this.lightsources.pop();
    this.scene.remove(lightToRemove);
    lightToRemove.geometry.dispose();

    const shadeToRemove = this.shades.pop();
    this.scene.remove(shadeToRemove);
    shadeToRemove.geometry.dispose();

    this.updateDragControlsObjects();
  }
  
  /**
   * Update all shades based on current light source positions
   */
  updateShades() {
    updatePlaneFromMesh(this.windshieldMesh, this.windshieldPlane);

    this.lightsources.forEach((light, i) => {
      const shade = this.shades[i];
      const intersection = linePlaneIntersection(
        this.windshieldPlane, 
        light.position, 
        this.driverEyeMesh.position
      );
      
      if (intersection) {
        shade.visible = true;
        const dist = light.position.distanceTo(intersection);
        const radius = computeShadingRadius(dist);
        
        shade.geometry.dispose();
        shade.geometry = new THREE.CylinderGeometry(radius, radius, 0.1, 32);
        shade.position.copy(intersection);
        
        const normal = this.windshieldPlane.normal.clone().normalize();
        shade.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
      } else {
        shade.visible = false;
      }
    });
  }
} 