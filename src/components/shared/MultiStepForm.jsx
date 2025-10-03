// Import Dependencies
import { useState } from "react";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import { Button } from "components/ui";

// ----------------------------------------------------------------------

export function MultiStepForm({
  steps,
  currentStep,
  onStepChange,
  children,
  onNext,
  onPrevious,
  onComplete,
  isLoading = false,
  isValid = true,
  completeButtonText,
}) {
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleNext = async () => {
    const result = await onNext?.();
    if (result !== false) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      if (currentStep < steps.length - 1) {
        onStepChange(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
      onPrevious?.();
    }
  };

  const handleComplete = async () => {
    const result = await onNext?.();
    if (result !== false) {
      setCompletedSteps((prev) => new Set([...prev, currentStep]));
      onComplete?.();
    }
  };

  const isStepCompleted = (stepIndex) => completedSteps.has(stepIndex);
  const isStepCurrent = (stepIndex) => stepIndex === currentStep;
  const isStepAccessible = (stepIndex) => stepIndex <= currentStep;

  return (
    <div className="space-y-8">
      {/* Step Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 overflow-x-auto" aria-label="Progress">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={clsx(
                "flex items-center pb-4 whitespace-nowrap",
                isStepAccessible(index)
                  ? "cursor-pointer"
                  : "cursor-not-allowed",
              )}
              onClick={() => isStepAccessible(index) && onStepChange(index)}
            >
              <div className="flex items-center">
                {/* Step Number/Icon */}
                <div
                  className={clsx(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                    isStepCompleted(index)
                      ? "border-green-500 bg-green-500 text-white"
                      : isStepCurrent(index)
                        ? "border-primary-500 bg-primary-500 text-white"
                        : isStepAccessible(index)
                          ? "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          : "border-gray-200 bg-gray-100 text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-600",
                  )}
                >
                  {isStepCompleted(index) ? (
                    <CheckIcon className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Title */}
                <div className="ml-3">
                  <p
                    className={clsx(
                      "text-sm font-medium",
                      isStepCurrent(index)
                        ? "text-primary-600 dark:text-primary-400"
                        : isStepCompleted(index)
                          ? "text-green-600 dark:text-green-400"
                          : isStepAccessible(index)
                            ? "text-gray-700 dark:text-gray-300"
                            : "text-gray-400 dark:text-gray-600",
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Separator */}
              {index < steps.length - 1 && (
                <ChevronRightIcon className="ml-6 h-5 w-5 text-gray-400" />
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">{children}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between border-t border-gray-200 pt-6 dark:border-gray-700">
        <Button
          onClick={handlePrevious}
          variant="outlined"
          color="neutral"
          disabled={currentStep === 0 || isLoading}
        >
          Previous
        </Button>

        <div className="flex space-x-3">
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={handleNext}
              color="primary"
              disabled={!isValid || isLoading}
              isLoading={isLoading}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              color="success"
              disabled={!isValid || isLoading}
              isLoading={isLoading}
            >
              {completeButtonText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
