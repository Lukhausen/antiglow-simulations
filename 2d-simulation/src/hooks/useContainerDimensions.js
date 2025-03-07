import { useState, useEffect } from 'react';

/**
 * Custom hook to manage container dimensions and handle resizing
 * @param {React.RefObject} containerRef - Reference to the container element
 * @param {Object} initialDimensions - Initial dimensions {width, height}
 * @returns {Object} - Current container dimensions {containerWidth, containerHeight}
 */
const useContainerDimensions = (containerRef, initialDimensions = { width: 800, height: 600 }) => {
  const [containerWidth, setContainerWidth] = useState(initialDimensions.width);
  const [containerHeight, setContainerHeight] = useState(initialDimensions.height);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = Math.min(rect.width, window.innerWidth * 0.9); // Use 90% of viewport width
        const newHeight = newWidth * (3 / 4); // Maintain 4:3 aspect ratio
        setContainerWidth(newWidth);
        setContainerHeight(newHeight);
      }
    };

    updateDimensions(); // Initial dimensions
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [containerRef]); // Only run on mount and when containerRef changes

  return { containerWidth, containerHeight };
};

export default useContainerDimensions; 