// Import Dependencies
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { MultiStepForm } from "components/shared/MultiStepForm";

// Step Components
import { BasicDetailsStep } from "features/Quotations/components/steps/BasicDetailsStep";
import { ItineraryPlanningStep } from "features/Quotations/components/steps/ItineraryPlanningStep";
import { PricingTermsStep } from "features/Quotations/components/steps/PricingTermsStep";

// Stores
import { useQuotationStore } from "features/Quotations/store/useQuotationStore";
import { useItineraryStore } from "features/Quotations/store/useItineraryStore";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { title: "Dashboard", path: "/" },
  { title: "Quotations", path: "/quotations" },
  { title: "Create Quotation" },
];

const quotationSteps = [
  {
    id: "basic-details",
    title: "Basic Details",
    description: "Customer info & quote ID",
    component: BasicDetailsStep,
  },

  {
    id: "itinerary-planning",
    title: "Itinerary Planning",
    description: "Day-wise detailed plan",
    component: ItineraryPlanningStep,
  },
  {
    id: "pricing-terms",
    title: "Pricing & Terms",
    description: "Cost breakdown & policies",
    component: PricingTermsStep,
  },
];

// ----------------------------------------------------------------------

export default function CreateQuotation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("leadId");

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { validateStep, exportQuotation, resetQuotation } = useQuotationStore();

  const { exportItinerary, clearItinerary, days } = useItineraryStore();

  // Custom validation that can access both stores
  const validateCurrentStep = (stepIndex) => {
    // For itinerary step (step 2), check the itinerary store directly
    if (stepIndex === 2) {
      return days && days.length > 0;
    }
    // For other steps, use the quotation store validation
    return validateStep(stepIndex);
  };

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleNext = async () => {
    // Validate current step before proceeding
    const isValid = validateCurrentStep(currentStep);
    if (!isValid) {
      // You could show a toast notification here
      console.warn("Please complete all required fields before proceeding");
      return false;
    }
    return true;
  };

  const handlePrevious = () => {
    // No special handling needed for going back
  };

  const handleComplete = async () => {
    setIsLoading(true);

    try {
      // Validate final step
      const isValid = validateCurrentStep(currentStep);
      if (!isValid) {
        console.warn("Please complete all required fields");
        return false;
      }

      // Export data from both stores
      const quotationData = exportQuotation();
      const itineraryData = exportItinerary();

      const completeQuotation = {
        ...quotationData,
        itinerary: itineraryData,
        leadId: leadId || null,
      };

      // In a real app with backend API:
      // const response = await api.post('/quotations', completeQuotation);

      console.log("Saving complete quotation:", completeQuotation);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Clear stores after successful save
      resetQuotation();
      clearItinerary();

      // Redirect based on context
      if (leadId) {
        navigate(`/leads/${leadId}`); // Go back to lead details
      } else {
        navigate("/quotations"); // Go to quotations list
      }
    } catch (error) {
      console.error("Error saving quotation:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get current step component
  const CurrentStepComponent = quotationSteps[currentStep].component;

  return (
    <Page title="Create Quotation - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                component={Link}
                to={leadId ? `/leads/${leadId}` : "/quotations"}
                variant="soft"
                color="neutral"
                isIcon
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <Breadcrumbs items={breadcrumbItems} />
                <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                  Create Quotation
                </h1>
                <p className="dark:text-dark-200 text-gray-600">
                  {leadId
                    ? "Create a detailed quotation for this lead"
                    : "Build a comprehensive travel quotation step by step"}
                </p>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg px-4 py-2">
              <div className="text-primary-700 dark:text-primary-300 text-sm font-medium">
                Step {currentStep + 1} of {quotationSteps.length}
              </div>
              <div className="text-primary-600 dark:text-primary-400 text-xs">
                {quotationSteps[currentStep].title}
              </div>
            </div>
          </div>

          {/* Multi-Step Form */}
          <MultiStepForm
            steps={quotationSteps}
            currentStep={currentStep}
            onStepChange={handleStepChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onComplete={handleComplete}
            isLoading={isLoading}
            isValid={validateCurrentStep(currentStep)}
            completeButtonText={"Complete Quotation"}
          >
            <CurrentStepComponent />
          </MultiStepForm>
        </div>
      </div>
    </Page>
  );
}
