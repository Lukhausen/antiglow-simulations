/**
 * Calculates the distance between two points
 * @param {Object} point1 - First point {x, y}
 * @param {Object} point2 - Second point {x, y}
 * @returns {number} - Distance between the points
 */
export const calculateDistance = (point1, point2) => {
  return Math.sqrt(
    (point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2
  );
};

/**
 * Calculates the angle between two vectors from a common origin
 * @param {Object} origin - Origin point {x, y}
 * @param {Object} point1 - First point {x, y}
 * @param {Object} point2 - Second point {x, y}
 * @returns {number} - Angle in degrees
 */
export const calculateAngle = (origin, point1, point2) => {
  const vector1 = {
    x: point1.x - origin.x,
    y: point1.y - origin.y
  };
  
  const vector2 = {
    x: point2.x - origin.x,
    y: point2.y - origin.y
  };
  
  const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
  const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
  const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);
  
  if (magnitude1 * magnitude2 === 0) return 0;
  
  const cosAngle = dotProduct / (magnitude1 * magnitude2);
  // Ensure cosAngle is within the valid range [-1, 1] due to floating point inaccuracies
  const clampedCosAngle = Math.max(-1, Math.min(1, cosAngle));
  return Math.acos(clampedCosAngle) * 180 / Math.PI;
};

/**
 * Calculates the dynamic shade radius based on projection
 * @param {Object} headlight - Headlight position {x, y}
 * @param {Object} driverHead - Driver head position {x, y}
 * @param {number} windshieldY - Y coordinate of the windshield
 * @param {number} driverRadius - Base radius of the driver's head
 * @returns {number} - Calculated shade radius
 */
export const calculateShadeRadius = (headlight, driverHead, windshieldY, driverRadius) => {
  if (Math.abs(driverHead.y - headlight.y) > 1e-6) {
    const tVal = (windshieldY - headlight.y) / (driverHead.y - headlight.y);
    return driverRadius * Math.abs(tVal) * 3; // Scale factor for demonstration
  } else {
    return driverRadius;
  }
}; 