import { useState } from 'react';

/**
 * Custom hook to manage step navigation
 * @param {number} maxSteps - Maximum number of steps
 * @param {Array} explanationSteps - Array of explanation objects for each step
 * @returns {Object} - Step navigation state and handlers
 */
const useStepNavigation = (maxSteps, explanationSteps) => {
  const [step, setStep] = useState(0);
  
  const handlePrevStep = () => {
    setStep(prev => Math.max(0, prev - 1));
  };

  const handleNextStep = () => {
    setStep(prev => Math.min(maxSteps, prev + 1));
  };

  const getStepExplanation = () => explanationSteps[step];

  return {
    step,
    handlePrevStep,
    handleNextStep,
    getStepExplanation,
    isFirstStep: step === 0,
    isLastStep: step === maxSteps
  };
};

export default useStepNavigation; 