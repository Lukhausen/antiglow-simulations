/**
 * Builds a wedge path for SVG
 * @param {number} cx - Center x coordinate
 * @param {number} cy - Center y coordinate
 * @param {number} r - Radius
 * @param {number} startA - Start angle in radians
 * @param {number} endA - End angle in radians
 * @returns {string} - SVG path string
 */
export const buildWedgePath = (cx, cy, r, startA, endA) => {
  const sx = cx + r * Math.cos(startA);
  const sy = cy + r * Math.sin(startA);
  const ex = cx + r * Math.cos(endA);
  const ey = cy + r * Math.sin(endA);
  return [
    `M ${cx},${cy}`,
    `L ${sx},${sy}`,
    `A ${r},${r} 0 0 1 ${ex},${ey}`,
    'Z'
  ].join(' ');
};

/**
 * Calculates the intersection point with the windshield
 * @param {Object} start - Start point {x, y}
 * @param {Object} vector - Direction vector {x, y}
 * @param {number} windshieldY - Y coordinate of the windshield
 * @returns {Object|null} - Intersection point {x, y} or null if no intersection
 */
export const calculateWindshieldIntersection = (start, vector, windshieldY) => {
  if (Math.abs(vector.y) < 1e-6) return null; // Avoid division by zero
  
  const t = (windshieldY - start.y) / vector.y;
  return {
    x: start.x + t * vector.x,
    y: windshieldY
  };
};

/**
 * Checks if a shadow should be shown based on positions
 * @param {Object} headlight - Headlight position {x, y}
 * @param {Object} driverHead - Driver head position {x, y}
 * @param {number} windshieldY - Y coordinate of the windshield
 * @returns {boolean} - Whether shadow should be shown
 */
export const shouldShowShadow = (headlight, driverHead, windshieldY) => {
  // Case 1: If driver and headlight are on the same side of the windshield, no shadow needed
  const sameWindshieldSide = (headlight.y < windshieldY && driverHead.y < windshieldY) || 
                            (headlight.y > windshieldY && driverHead.y > windshieldY);
  if (sameWindshieldSide) return false;

  // Case 2: If headlight is inside (below windshield) and driver is outside (above), no shadow
  if (headlight.y > windshieldY && driverHead.y < windshieldY) return false;

  // Case 3: If driver is inside (below windshield) and headlight is outside (above), show shadow
  if (headlight.y < windshieldY && driverHead.y > windshieldY) return true;

  // Default case: no shadow
  return false;
}; 