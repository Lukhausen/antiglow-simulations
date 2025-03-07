import React, { useRef, useEffect } from 'react';
import './App.css';
import logo from './assets/logo.png';
import { HeadlightIcon, DriverIcon } from './components/icons';
import { SimulationCanvas, StepNavigation } from './components/simulation';
import { useContainerDimensions, useDraggable, useStepNavigation } from './hooks';
import explanationSteps from './constants/explanationSteps';

/**
 * Main application component
 * @returns {JSX.Element} - App component
 */
export default function App() {
  // Set document title on mount
  useEffect(() => {
    document.title = 'AntiGlow Simulation';
  }, []);

  // Container reference for dimensions and dragging
  const containerRef = useRef(null);
  
  // Custom hooks
  const { containerWidth, containerHeight } = useContainerDimensions(containerRef);
  const { positions, handlers } = useDraggable(containerRef, { width: containerWidth, height: containerHeight });
  const { step, handlePrevStep, handleNextStep, getStepExplanation } = useStepNavigation(5, explanationSteps);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="ANTIGLOW" className="logo" />
        </div>
      </header>
      
      <div className="explainer-text">
        Entdecken Sie in unserer interaktiven Simulation, wie unsere innovative Blendschutztechnologie funktioniert.
        AntiGlow nutzt Echtzeit-Kameraerkennung und dynamische LCD-Maskierung, um Sie vor Blendung durch entgegenkommende Fahrzeuge und Sonneneinstrahlung zu schützen.
      </div>
      
      <div className="main-content">
        <div className="info-section">
          <StepNavigation 
            step={step}
            maxSteps={5}
            onPrevStep={handlePrevStep}
            onNextStep={handleNextStep}
            explanation={getStepExplanation()}
          />
        </div>

        <SimulationCanvas 
          dimensions={{ containerWidth, containerHeight }}
          positions={positions}
          handlers={handlers}
          step={step}
          containerRef={containerRef}
        />
      </div>
      <p className="simulation-description">
        Ziehen Sie <HeadlightIcon /> oder <DriverIcon /> um die Simulation zu aktualisieren
      </p>
    </div>
  );
}
