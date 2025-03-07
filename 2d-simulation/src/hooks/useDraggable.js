import { useState, useEffect } from 'react';

/**
 * Custom hook to handle draggable elements
 * @param {React.RefObject} containerRef - Reference to the container element
 * @param {Object} bounds - Bounds for dragging {width, height}
 * @returns {Object} - Dragging state and handlers
 */
const useDraggable = (containerRef, bounds) => {
  const [dragging, setDragging] = useState(null);
  const [positions, setPositions] = useState({
    driver: { x: 450, y: 500 },
    headlight: { x: 350, y: 150 }
  });

  const onMouseDown = (e, type) => {
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    const pos = positions[type];
    const offsetX = e.clientX - rect.left - pos.x;
    const offsetY = e.clientY - rect.top - pos.y;
    setDragging({ type, offsetX, offsetY });
  };
  
  const onMouseMove = (e) => {
    if (!dragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    let newX = e.clientX - rect.left - dragging.offsetX;
    let newY = e.clientY - rect.top - dragging.offsetY;

    // Keep within bounds
    newX = Math.max(0, Math.min(newX, bounds.width));
    newY = Math.max(0, Math.min(newY, bounds.height));

    setPositions(prev => ({
      ...prev,
      [dragging.type]: { x: newX, y: newY }
    }));
  };
  
  const onMouseUp = () => setDragging(null);
  
  const onTouchStart = (e, type) => {
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const pos = positions[type];
    const offsetX = touch.clientX - rect.left - pos.x;
    const offsetY = touch.clientY - rect.top - pos.y;
    setDragging({ type, offsetX, offsetY });
  };

  const onTouchMove = (e) => {
    if (!dragging) return;
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    let newX = touch.clientX - rect.left - dragging.offsetX;
    let newY = touch.clientY - rect.top - dragging.offsetY;
    
    // Keep within bounds
    newX = Math.max(0, Math.min(newX, bounds.width));
    newY = Math.max(0, Math.min(newY, bounds.height));
    
    setPositions(prev => ({
      ...prev,
      [dragging.type]: { x: newX, y: newY }
    }));
  };

  const onTouchEnd = () => setDragging(null);
  
  // Set up event listeners
  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [dragging, bounds.width, bounds.height]); // Add dependencies

  // Update positions when bounds change
  useEffect(() => {
    setPositions(prev => ({
      driver: {
        x: bounds.width * (prev.driver.x / 800), // Scale based on original width
        y: bounds.height * (prev.driver.y / 600)
      },
      headlight: {
        x: bounds.width * (prev.headlight.x / 800),
        y: bounds.height * (prev.headlight.y / 600)
      }
    }));
  }, [bounds.width, bounds.height]);

  return {
    positions,
    dragging,
    handlers: {
      onMouseDown,
      onTouchStart
    }
  };
};

export default useDraggable; 