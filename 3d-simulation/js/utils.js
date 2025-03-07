import * as THREE from 'three';

/**
 * Updates a THREE.Plane object based on a mesh's position and orientation
 * @param {THREE.Mesh} mesh - The mesh to extract position and orientation from
 * @param {THREE.Plane} plane - The plane to update
 */
export function updatePlaneFromMesh(mesh, plane) {
  const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(mesh.quaternion).normalize();
  const position = new THREE.Vector3().setFromMatrixPosition(mesh.matrixWorld);
  plane.set(normal, -normal.dot(position));
}

/**
 * Calculates the intersection point between a line (defined by two points) and a plane
 * @param {THREE.Plane} plane - The plane to intersect with
 * @param {THREE.Vector3} pointA - First point defining the line
 * @param {THREE.Vector3} pointB - Second point defining the line
 * @returns {THREE.Vector3|null} - The intersection point or null if no intersection
 */
export function linePlaneIntersection(plane, pointA, pointB) {
  const line = new THREE.Line3(pointA, pointB);
  const intersection = new THREE.Vector3();
  return plane.intersectLine(line, intersection) ? intersection : null;
}

/**
 * Computes the appropriate shading radius based on distance
 * @param {number} dist - Distance from light source to intersection point
 * @returns {number} - Calculated radius for the shading element
 */
export function computeShadingRadius(dist) {
  const minDist = 0.5, maxDist = 30;
  const minRadius = 0.1, maxRadius = 2.5;
  return THREE.MathUtils.clamp(
    (maxRadius - ((dist - minDist) / (maxDist - minDist)) * (maxRadius - minRadius)) * 0.5,
    minRadius,
    maxRadius
  );
} 