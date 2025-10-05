// Import Dependencies
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";

// Local Imports
import { Card, Button } from "components/ui";
import {
  travelDetailsSchema,
  hotelsTransportationSchema,
  costPricingSchema,
  inclusionsExclusionsSchema,
  reviewSchema,
} from "../schema/quotation-schemas";

// Step Components
import { TravelDetailsStep } from "./steps/TravelDetailsStep";
import { HotelsTransportationStep } from "./steps/HotelsTransportationStep";
import { CostPricingStep } from "./steps/CostPricingStep";
import { InclusionsExclusionsStep } from "./steps/InclusionsExclusionsStep";
import { ReviewStep } from "./steps/ReviewStep";

// ----------------------------------------------------------------------

const steps = [
  {
    id: 1,
    title: "Travel Details",
    description: "Basic travel information and requirements",
    component: TravelDetailsStep,
    schema: travelDetailsSchema,
  },
  {
    id: 2,
    title: "Hotels & Transportation",
    description: "Accommodation and transport preferences",
    component: HotelsTransportationStep,
    schema: hotelsTransportationSchema,
  },
  {
    id: 3,
    title: "Cost & Pricing",
    description: "Package pricing and payment terms",
    component: CostPricingStep,
    schema: costPricingSchema,
  },
  {
    id: 4,
    title: "Inclusions & Exclusions",
    description: "What's included and excluded in the package",
    component: InclusionsExclusionsStep,
    schema: inclusionsExclusionsSchema,
  },
  {
    id: 5,
    title: "Review & Generate",
    description: "Review all details and generate quotation",
    component: ReviewStep,
    schema: reviewSchema,
  },
];

// ----------------------------------------------------------------------

export function QuotationStepper({ leadId }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Travel Details defaults
    lead_id: leadId,
    days: 1,
    nights: 1,
    adults: 2,
    children: 0,
    taxes_services_charges: 18,
  });
  const navigate = useNavigate();

  // Get current step configuration
  const currentStepConfig = steps.find((step) => step.id === currentStep);

  // React Hook Form setup for current step only
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(currentStepConfig?.schema || travelDetailsSchema),
    mode: "onChange",
    defaultValues: formData,
  });

  // Navigation handlers
  const handleNext = async () => {
    // First trigger validation to ensure all errors are shown
    const isStepValid = await trigger();

    if (isStepValid && currentStep < steps.length) {
      // Save current step data to local state
      const currentStepData = getValues();
      setFormData((prev) => ({ ...prev, ...currentStepData }));

      // Move to next step
      setCurrentStep(currentStep + 1);
    } else if (!isStepValid) {
      // If validation fails, the form will show errors automatically
      console.log("Form validation failed. Please fill all required fields.");
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      // Save current step data before going back
      const currentStepData = getValues();
      setFormData((prev) => ({ ...prev, ...currentStepData }));

      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = async (stepNumber) => {
    // Allow navigation to previous steps only
    if (stepNumber <= currentStep) {
      // Save current step data before switching
      const currentStepData = getValues();
      setFormData((prev) => ({ ...prev, ...currentStepData }));

      setCurrentStep(stepNumber);
    }
  };

  // Form submission for final step
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Combine all step data
      const finalData = { ...formData, ...data };

      // In real app, make API call to create quotation
      console.log("Quotation Data:", finalData);

      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to quotations list or success page
      navigate("/quotations");
    } catch (error) {
      console.error("Error creating quotation:", error);
      alert("Error creating quotation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form when step changes
  useEffect(() => {
    reset(formData);
  }, [currentStep, reset, formData]);

  // Get current step component
  const CurrentStepComponent = steps.find(
    (step) => step.id === currentStep,
  )?.component;

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create New Quotation
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Lead ID: {leadId} • Step {currentStep} of {steps.length}
          </p>
        </div>

        {/* Progress Stepper */}
        <Card className="mb-8 p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex cursor-pointer items-center ${
                    step.id <= currentStep
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                  onClick={() => handleStepClick(step.id)}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                      step.id === currentStep
                        ? "border-blue-600 bg-blue-600 text-white"
                        : step.id < currentStep
                          ? "border-green-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {step.id < currentStep ? "✓" : step.id}
                  </div>
                  <div className="ml-3 hidden md:block">
                    <p
                      className={`text-sm font-medium ${
                        step.id <= currentStep
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`mx-4 h-0.5 w-16 ${
                      step.id < currentStep
                        ? "bg-green-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Current Step Content */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {CurrentStepComponent && (
            <CurrentStepComponent
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              onSubmit={onSubmit}
              isSubmitting={isSubmitting}
            />
          )}

          {/* Navigation Buttons */}
          <Card className="mt-8 p-6">
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                ← Previous
              </Button>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/leads")}
                >
                  Cancel
                </Button>

                {currentStep < steps.length ? (
                  <div className="flex flex-col items-end">
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isValid}
                    >
                      Next →
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[150px]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 animate-spin">⏳</span>
                        Creating...
                      </>
                    ) : (
                      "Create Quotation"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
