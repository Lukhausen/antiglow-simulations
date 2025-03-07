import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '../icons';

/**
 * Step navigation component for the simulation
 * @param {Object} props - Component props
 * @param {number} props.step - Current step
 * @param {number} props.maxSteps - Maximum number of steps
 * @param {Function} props.onPrevStep - Handler for previous step
 * @param {Function} props.onNextStep - Handler for next step
 * @param {Object} props.explanation - Current step explanation
 * @returns {JSX.Element} - Step navigation component
 */
const StepNavigation = ({ step, maxSteps, onPrevStep, onNextStep, explanation }) => {
  return (
    <div 
      className="step-control"
      style={{ 
        '--progress': `${(step / maxSteps) * 100}%`
      }}
    >
      <div className="step-navigation">
        <div className="nav-buttons">
          <button 
            className="nav-button" 
            onClick={onPrevStep}
            disabled={step === 0}
          >
            <ArrowLeftIcon />
          </button>
          
          <span className="step-counter">Schritt {step + 1} von {maxSteps + 1}</span>
          
          <button 
            className="nav-button next" 
            onClick={onNextStep}
            disabled={step === maxSteps}
          >
            <ArrowRightIcon />
          </button>
        </div>
        
        <div className="step-content">
          <h3 className="step-title">{explanation.title}</h3>
          <p className="step-description">{explanation.description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepNavigation; 