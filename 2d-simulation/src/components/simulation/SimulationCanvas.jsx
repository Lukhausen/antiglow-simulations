import React from 'react';
import { CameraIcon, DriverIcon, HeadlightIcon } from '../icons';
import { 
  buildWedgePath, 
  calculateWindshieldIntersection, 
  shouldShowShadow,
  calculateDistance,
  calculateAngle,
  calculateShadeRadius
} from '../../utils';

/**
 * Simulation canvas component
 * @param {Object} props - Component props
 * @param {Object} props.dimensions - Container dimensions {containerWidth, containerHeight}
 * @param {Object} props.positions - Positions of elements {driver, headlight}
 * @param {Object} props.handlers - Event handlers {onMouseDown, onTouchStart}
 * @param {number} props.step - Current step
 * @param {React.RefObject} props.containerRef - Reference to the container element
 * @returns {JSX.Element} - Simulation canvas component
 */
const SimulationCanvas = ({ 
  dimensions, 
  positions, 
  handlers, 
  step,
  containerRef 
}) => {
  const { containerWidth, containerHeight } = dimensions;
  const { driver: driverHead, headlight } = positions;
  const { onMouseDown, onTouchStart } = handlers;
  
  // Constants
  const driverRadius = 15;
  const windshieldY = containerHeight * 0.5; // Keep windshield at 50%
  const cameraPos = { 
    x: containerWidth * (2/3), // Position 1/3 from the right edge
    y: windshieldY 
  };
  const eyePosition = {
    x: driverHead.x,
    y: driverHead.y - 10 // Eyes are slightly above the head center
  };
  
  // Calculations for the headlight beam
  const dx = driverHead.x - headlight.x;
  const dy = driverHead.y - headlight.y;
  const angleCenter = Math.atan2(dy, dx);
  const halfAngle = Math.PI / 6; // ±30° wedge
  const angleStart = angleCenter - halfAngle;
  const angleEnd = angleCenter + halfAngle;
  const wedgeRadius = 2000; // Extend far enough off-screen
  
  const wedgePath = buildWedgePath(headlight.x, headlight.y, wedgeRadius, angleStart, angleEnd);
  
  // Calculate shade circle on windshield
  let shadeCenterX = headlight.x;
  if (Math.abs(dy) > 1e-6) {
    const t = (windshieldY - headlight.y) / dy;
    shadeCenterX = headlight.x + t * dx;
  }
  
  // Compute the dynamic radius based on the projection ratio
  const shadeRadius = calculateShadeRadius(headlight, driverHead, windshieldY, driverRadius);
  
  const leftEdge = { x: shadeCenterX - shadeRadius, y: windshieldY };
  const rightEdge = { x: shadeCenterX + shadeRadius, y: windshieldY };
  
  // Extend the shadow behind the windshield
  let tExtend = 1;
  if (Math.abs(windshieldY - headlight.y) > 1e-6) {
    tExtend = (containerHeight - headlight.y) / (windshieldY - headlight.y);
  }
  const extendedLeft = {
    x: headlight.x + tExtend * (leftEdge.x - headlight.x),
    y: headlight.y + tExtend * (windshieldY - headlight.y)
  };
  const extendedRight = {
    x: headlight.x + tExtend * (rightEdge.x - headlight.x),
    y: headlight.y + tExtend * (windshieldY - headlight.y)
  };
  
  const shadowPolygon = [
    `M ${leftEdge.x},${leftEdge.y}`,
    `L ${extendedLeft.x},${extendedLeft.y}`,
    `L ${extendedRight.x},${extendedRight.y}`,
    `L ${rightEdge.x},${rightEdge.y}`,
    'Z'
  ].join(' ');
  
  // Build the mask for the beam
  const maskPaths = (
    <>
      {/* Reveal beam wedge */}
      <path d={wedgePath} fill="white" />
      {/* Block the shadow region */}
      <path d={shadowPolygon} fill="black" />
    </>
  );
  
  // Calculate distances and angle for display
  const distanceCameraDriver = calculateDistance(cameraPos, eyePosition);
  const distanceCameraHeadlight = calculateDistance(cameraPos, headlight);
  
  // Convert distances to cm and meters for display - assuming container units are roughly pixels/cm
  const distanceCameraDriverCm = (distanceCameraDriver / 10).toFixed(0); // Assuming 10 pixels per cm for scaling
  const distanceCameraHeadlightMeters = (distanceCameraHeadlight / 100).toFixed(1); // Assuming 100 pixels per meter
  
  // Calculate angle at camera
  const angleDegrees = calculateAngle(cameraPos, eyePosition, headlight).toFixed(1);
  
  // Calculate points for the angle arc
  const angleRadius = 30; // Radius of the angle arc
  const startAngle = Math.atan2(eyePosition.y - cameraPos.y, eyePosition.x - cameraPos.x);
  const endAngle = Math.atan2(headlight.y - cameraPos.y, headlight.x - cameraPos.x);
  
  const arcStartPointX = cameraPos.x + angleRadius * Math.cos(startAngle);
  const arcStartPointY = cameraPos.y + angleRadius * Math.sin(startAngle);
  const arcEndPointX = cameraPos.x + angleRadius * Math.cos(endAngle);
  const arcEndPointY = cameraPos.y + angleRadius * Math.sin(endAngle);
  
  // Determine if the arc should be drawn clockwise or counter-clockwise
  const sweepFlag = endAngle < startAngle ? 1 : 0;
  
  // Calculate vector from headlight to eyes
  const headlightToEyeVector = {
    x: eyePosition.x - headlight.x,
    y: eyePosition.y - headlight.y
  };
  
  // Calculate intersection with windshield
  const intersectionPoint = calculateWindshieldIntersection(headlight, headlightToEyeVector, windshieldY);
  
  return (
    <div
      ref={containerRef}
      className="simulation-container"
      style={{ width: containerWidth, height: containerHeight }}
    >
      <svg width={containerWidth} height={containerHeight} className="simulation-svg">
        <defs>
          <radialGradient
            id="pieGradient"
            gradientUnits="userSpaceOnUse"
            cx={headlight.x}
            cy={headlight.y}
            r={wedgeRadius}
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
            <stop offset="20%" stopColor="rgba(255, 255, 255, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 255, 255, 0.1)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          <mask id="shadeMask">
            <rect x="0" y="0" width="100%" height="100%" fill="black" />
            {maskPaths}
          </mask>
        </defs>
        
        {/* Draw the windshield */}
        <line
          x1="0"
          y1={windshieldY}
          x2={containerWidth}
          y2={windshieldY}
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
          strokeDasharray="8,4"
        />
        
        {/* Add Windshield Label */}
        <text
          x={containerWidth - 10}
          y={windshieldY - 5}
          textAnchor="end"
          className="distance-text"
        >
          Windschutzscheibe
        </text>
        
        {/* Show initial problem state only in step 0 */}
        {step === 0 && (
          <>
            <path d={wedgePath} fill="url(#pieGradient)" style={{ opacity: 1.2 }} />
            {/* Add stronger glare effect */}
            <circle
              cx={driverHead.x}
              cy={driverHead.y}
              r="50"
              fill="rgba(255, 255, 255, 0.2)"
              filter="blur(15px)"
            />
            <text
              x={driverHead.x}
              y={driverHead.y - 50}
              textAnchor="middle"
              fill="var(--accent-yellow)"
              fontSize="14"
            >
              ⚠️ Gefährliche Blendung
            </text>
          </>
        )}
        
        {/* Rest of the visualization logic, update step checks */}
        {step > 0 && step < 4 && (
          <path d={wedgePath} fill="url(#pieGradient)" />
        )}
        
        {/* Step 1: Camera Position Detection, Step 2: Headlight Position Mapping, Step 3: Angle Calculation, Step 4 & 5: Keep measurements visible */}
        {step >= 1 && step <= 5 && (
          <>
            {/* Distance camera-driver (blue), visible in steps 1-5 */}
            <line
              x1={cameraPos.x}
              y1={cameraPos.y}
              x2={eyePosition.x}
              y2={eyePosition.y}
              stroke="var(--accent-blue)"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text
              x={cameraPos.x + (eyePosition.x - cameraPos.x) / 2}
              y={cameraPos.y + (eyePosition.y - cameraPos.y) / 2 - 10}
              className="distance-text"
            >
              {distanceCameraDriverCm} cm
            </text>

            {/* Distance camera-headlight (yellow), visible in steps 2-5 */}
            {step >= 2 && (
              <>
                <line
                  x1={cameraPos.x}
                  y1={cameraPos.y}
                  x2={headlight.x}
                  y2={headlight.y}
                  stroke="var(--accent-yellow)"
                  strokeWidth="2"
                  strokeDasharray="4,4"
                />
                <text
                  x={cameraPos.x + (headlight.x - cameraPos.x) / 2}
                  y={cameraPos.y + (headlight.y - cameraPos.y) / 2 - 10}
                  className="distance-text"
                >
                  {distanceCameraHeadlightMeters} m
                </text>
              </>
            )}

            {/* Angle visualization, visible in steps 3-5 */}
            {step >= 3 && (
              <>
                <path
                  d={`M ${arcStartPointX},${arcStartPointY} A ${angleRadius},${angleRadius} 0 0,${sweepFlag} ${arcEndPointX},${arcEndPointY}`}
                  stroke="var(--accent-blue)"
                  strokeWidth="2"
                  fill="none"
                />
                <text
                  x={cameraPos.x}
                  y={cameraPos.y - 20}
                  textAnchor="middle"
                  className="angle-text"
                >
                  {angleDegrees}°
                </text>
              </>
            )}
          </>
        )}
        
        {/* Step 4: Glare Path Projection */}
        {step === 4 && (
          <>
            {/* Show base light beam with normal opacity (same as other steps) */}
            <path d={wedgePath} fill="url(#pieGradient)" />
            
            {/* Show glare path from headlight to driver's eyes */}
            <line
              x1={headlight.x}
              y1={headlight.y}
              x2={eyePosition.x}
              y2={eyePosition.y}
              stroke="var(--accent-yellow)"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            
            {/* Show intersection point with animation */}
            {intersectionPoint && (
              <>
                {/* Outer glow */}
                <circle
                  cx={intersectionPoint.x}
                  cy={intersectionPoint.y}
                  r="12"
                  fill="var(--accent-yellow)"
                  fillOpacity="0.1"
                >
                  <animate
                    attributeName="r"
                    values="12;16;12"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="fill-opacity"
                    values="0.1;0.2;0.1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Middle ring */}
                <circle
                  cx={intersectionPoint.x}
                  cy={intersectionPoint.y}
                  r="8"
                  fill="none"
                  stroke="var(--accent-yellow)"
                  strokeWidth="2"
                  strokeOpacity="0.3"
                />
                
                {/* Center point */}
                <circle
                  cx={intersectionPoint.x}
                  cy={intersectionPoint.y}
                  r="4"
                  fill="var(--accent-yellow)"
                  stroke="var(--accent-yellow)"
                  strokeWidth="2"
                >
                  <animate
                    attributeName="fill-opacity"
                    values="1;0.7;1"
                    dur="1.5s"
                    repeatCount="indefinite"
                  />
                </circle>
                
                {/* Add intersection label */}
                <text
                  x={intersectionPoint.x}
                  y={intersectionPoint.y - 20}
                  textAnchor="middle"
                  fill="var(--accent-yellow)"
                  fontSize="12"
                  fontWeight="500"
                >
                  Schnittpunkt
                </text>
              </>
            )}
          </>
        )}
        
        {/* Step 5: Dynamic Shadow Masking */}
        {step === 5 && shouldShowShadow(headlight, driverHead, windshieldY) && (
          <>
            {/* Keep measurement lines visible with reduced opacity */}
            <line
              x1={cameraPos.x}
              y1={cameraPos.y}
              x2={headlight.x}
              y2={headlight.y}
              stroke="var(--accent-yellow)"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.3"
            />
            <line
              x1={cameraPos.x}
              y1={cameraPos.y}
              x2={eyePosition.x}
              y2={eyePosition.y}
              stroke="var(--accent-blue)"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.3"
            />
            
            {/* Show glare path */}
            <line
              x1={headlight.x}
              y1={headlight.y}
              x2={eyePosition.x}
              y2={eyePosition.y}
              stroke="var(--accent-yellow)"
              strokeWidth="2"
              strokeDasharray="4,4"
              opacity="0.3"
            />
            
            {/* Only show the masked beam */}
            <path 
              d={wedgePath} 
              fill="url(#pieGradient)" 
              mask="url(#shadeMask)"
            />
            
            {/* Add shadow mask with animation */}
            <rect
              x={shadeCenterX - shadeRadius}
              y={windshieldY - 2}
              width={shadeRadius * 2}
              height={4}
              fill="rgba(0, 0, 0, 0.7)"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            >
              <animate
                attributeName="fill-opacity"
                values="0.7;0.9;0.7"
                dur="2s"
                repeatCount="indefinite"
              />
            </rect>
          </>
        )}
      </svg>

      {/* Camera icon */}
      <div className="camera-icon" style={{ left: cameraPos.x - 15, top: cameraPos.y - 15 }}>
        <CameraIcon />
      </div>

      {/* Driver head icon */}
      <div
        className="draggable driver-head"
        onMouseDown={(e) => onMouseDown(e, 'driver')}
        onTouchStart={(e) => onTouchStart(e, 'driver')}
        style={{
          left: driverHead.x - driverRadius,
          top: driverHead.y - driverRadius,
          width: driverRadius * 2,
          height: driverRadius * 2
        }}
      >
        <DriverIcon />
      </div>

      {/* Headlight icon */}
      <div
        className="draggable headlight"
        onMouseDown={(e) => onMouseDown(e, 'headlight')}
        onTouchStart={(e) => onTouchStart(e, 'headlight')}
        style={{ left: headlight.x - 15, top: headlight.y - 15, width: 30, height: 30 }}
      >
        <HeadlightIcon />
      </div>
    </div>
  );
};

export default SimulationCanvas; 