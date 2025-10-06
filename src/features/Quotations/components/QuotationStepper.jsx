// Import Dependencies
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useSearchParams } from "react-router";

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
import { ROUTES } from "app/router/routes";

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
    title: "Inclusions & Exclusions",
    description: "What's included and excluded in the package",
    component: InclusionsExclusionsStep,
    schema: inclusionsExclusionsSchema,
  },
  {
    id: 4,
    title: "Cost & Pricing",
    description: "Package pricing and payment terms",
    component: CostPricingStep,
    schema: costPricingSchema,
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

export function QuotationStepper({
  leadId,
  quotationId,
  initialData = null,
  isEditMode = false,
}) {
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
    // Merge with initialData if provided
    ...initialData,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlLeadId = searchParams.get("leadId");

  // Update formData when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
        // Ensure lead_id is properly set
        lead_id: leadId || initialData.lead_id,
      }));
    }
  }, [initialData, leadId]);

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
    console.log("🗃️ Combined form data:", { ...formData, ...data });
    setIsSubmitting(true);
    try {
      // Combine all step data
      const finalData = { ...formData, ...data };

      if (isEditMode && quotationId) {
        // Update existing quotation
        console.log("Updating quotation:", quotationId, finalData);
        // Mock API call for update
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Quotation updated successfully");
      } else {
        // Create new quotation
        console.log("Creating new quotation:", finalData);
        // Mock API call for create
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Quotation created successfully");
      }

      // Navigate to quotations list or success page
      navigate(ROUTES.QUOTATIONS.ALL);
    } catch (error) {
      console.error(
        isEditMode ? "Error updating quotation:" : "Error creating quotation:",
        error,
      );
      alert(
        `Error ${isEditMode ? "updating" : "creating"} quotation. Please try again.`,
      );
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
            {isEditMode
              ? "Edit Quotation"
              : urlLeadId
                ? "Create Quotation from Lead"
                : "Create New Quotation"}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {(leadId || urlLeadId) && `Lead ID: ${leadId || urlLeadId} • `}
            Step {currentStep} of {steps.length}
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
        <form
          onSubmit={handleSubmit((data) => {
            console.log("📋 Form onSubmit handler called!");
            onSubmit(data);
          })}
        >
          {CurrentStepComponent && (
            <CurrentStepComponent
              control={control}
              register={register}
              errors={errors}
              watch={watch}
              setValue={setValue}
              defaultData={formData}
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
                  onClick={() => navigate(ROUTES.LEADS.ALL)}
                >
                  Cancel
                </Button>

                {currentStep < steps.length ? (
                  <div className="flex flex-col items-end">
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isValid}
                      color={isValid ? "primary" : "neutral"}
                    >
                      Next →
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !isValid}
                    color={isValid ? "primary" : "neutral"}
                    onClick={() => {
                      console.log("🖱️ Submit button clicked!");
                      console.log("✅ Form is valid:", isValid);
                      console.log("🔍 Current errors:", errors);
                      console.log("📊 Current form values:", getValues());
                      console.log(
                        "🎯 Template selection:",
                        getValues().template_selection,
                      );
                    }}
                    className="min-w-[150px]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : isEditMode ? (
                      "Update Quotation"
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
