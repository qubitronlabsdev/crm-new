// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { MultiStepForm } from "components/shared/MultiStepForm";

// Step Components
import { BasicDetailsStep } from "features/Quotations/components/steps/BasicDetailsStep";
import { TravelRequirementsStep } from "features/Quotations/components/steps/TravelRequirementsStep";
import { ItineraryPlanningStep } from "features/Quotations/components/steps/ItineraryPlanningStep";
import { PricingTermsStep } from "features/Quotations/components/steps/PricingTermsStep";

// Stores
import { useQuotationStore } from "features/Quotations/store/useQuotationStore";
import { useItineraryStore } from "features/Quotations/store/useItineraryStore";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { title: "Dashboard", path: "/" },
  { title: "Quotations", path: "/quotations" },
  { title: "Edit Quotation" },
];

const quotationSteps = [
  {
    id: "basic-details",
    title: "Basic Details",
    description: "Customer info & quote ID",
    component: BasicDetailsStep,
  },
  {
    id: "travel-requirements",
    title: "Travel Requirements",
    description: "Destination & preferences",
    component: TravelRequirementsStep,
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

// Mock function to simulate fetching quotation data
const fetchQuotationData = async (id) => {
  // In a real app, this would be an API call
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading

  // Generate mock data based on ID
  const quotationTemplates = {
    1: {
      basicDetails: {
        quoteId: "QT-240001-ABC",
        version: "1.0",
        title: "Paris Romantic Getaway",
        customerName: "John Smith",
        customerEmail: "john.smith@email.com",
        customerPhone: "+1-555-0123",
        validUntil: "2024-10-31",
        description: "A romantic getaway package for 2 people to Paris",
      },
      travelRequirements: {
        destination: "Paris, France",
        startDate: "2024-11-15",
        endDate: "2024-11-22",
        duration: 7,
        numberOfTravelers: 2,
        adults: 2,
        children: 0,
        infants: 0,
        travelType: "leisure",
        budgetRange: "3000-4000",
        specialRequirements: "Honeymoon package with romantic activities",
        accommodationType: "hotel",
        roomType: "deluxe",
        mealPlan: "breakfast",
        transportPreference: "flight",
      },
    },
    2: {
      basicDetails: {
        quoteId: "QT-240002-DEF",
        version: "1.0",
        title: "Tokyo Adventure Tour",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.johnson@email.com",
        customerPhone: "+1-555-0456",
        validUntil: "2024-10-28",
        description: "An exciting adventure tour for 1 person to Tokyo",
      },
      travelRequirements: {
        destination: "Tokyo, Japan",
        startDate: "2024-12-01",
        endDate: "2024-12-08",
        duration: 7,
        numberOfTravelers: 1,
        adults: 1,
        children: 0,
        infants: 0,
        travelType: "adventure",
        budgetRange: "4000-5000",
        specialRequirements: "Interest in tech tours and anime culture",
        accommodationType: "hotel",
        roomType: "standard",
        mealPlan: "breakfast",
        transportPreference: "flight",
      },
    },
  };

  const template = quotationTemplates[id] || quotationTemplates[1];

  return {
    ...template,
    itinerary: {
      days: [
        {
          id: 1,
          dayNumber: 1,
          title: `Day 1 - Arrival in ${template.travelRequirements.destination.split(",")[0]}`,
          description: "Arrival and hotel check-in",
          items: [
            {
              id: 1,
              type: "flight",
              title: `Flight to ${template.travelRequirements.destination.split(",")[0]}`,
              description: "International flight",
              cost: 800,
              time: "10:00 AM",
              location: "International Airport",
              notes: "Direct flight",
            },
            {
              id: 2,
              type: "hotel",
              title: "Hotel Check-in",
              description: "Luxury hotel accommodation",
              cost: 200,
              time: "3:00 PM",
              location: "City Center Hotel",
              notes: "Premium room with city view",
            },
          ],
        },
      ],
    },
    pricingTerms: {
      costBreakdown: {
        landPackage: template.travelRequirements.destination.includes("Paris")
          ? 2500
          : 3200,
        flights: 800,
        hotels: template.travelRequirements.destination.includes("Paris")
          ? 1400
          : 1800,
        transportation: 200,
        activities: 300,
        taxes: 200,
        markup: 20,
      },
      totalCost: template.travelRequirements.destination.includes("Paris")
        ? 3500
        : 4200,
      currency: "USD",
      paymentTerms: {
        advancePayment: 25,
        finalPayment: 75,
        advanceDueDate: "2024-10-15",
        finalDueDate: "2024-11-01",
      },
      inclusions: [
        "Accommodation as per itinerary",
        "Daily breakfast",
        "Airport transfers",
        "Sightseeing as mentioned",
        "Professional tour guide",
        "All applicable taxes",
      ],
      exclusions: [
        "International flights",
        "Visa fees",
        "Travel insurance",
        "Personal expenses",
        "Meals not mentioned",
        "Tips and gratuities",
        "Optional activities",
      ],
      cancellationPolicy: "Standard cancellation policy applies",
      termsAndConditions: "Standard terms and conditions apply",
    },
  };
};

// ----------------------------------------------------------------------

export default function EditQuotation() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [quotationTitle, setQuotationTitle] = useState("");

  const {
    validateStep,
    exportQuotation,
    setBasicDetails,
    setTravelRequirements,
    setItinerary,
    setPricingTerms,
  } = useQuotationStore();

  const { exportItinerary, loadItinerary, days } = useItineraryStore();

  // Custom validation that can access both stores
  const validateCurrentStep = (stepIndex) => {
    // For itinerary step (step 2), check the itinerary store directly
    if (stepIndex === 2) {
      return days && days.length > 0;
    }
    // For other steps, use the quotation store validation
    return validateStep(stepIndex);
  };

  // Load existing quotation data
  useEffect(() => {
    const loadQuotationData = async () => {
      if (!id) return;

      setIsLoadingData(true);
      try {
        const data = await fetchQuotationData(id);

        // Load data into stores
        setBasicDetails(data.basicDetails);
        setTravelRequirements(data.travelRequirements);
        setItinerary(data.itinerary);
        setPricingTerms(data.pricingTerms);
        setQuotationTitle(data.basicDetails.title);

        // Load itinerary data into itinerary store
        if (data.itinerary.days.length > 0) {
          loadItinerary({
            quotation: {
              title: data.basicDetails.title,
              destination: data.travelRequirements.destination,
              duration: data.travelRequirements.duration,
              travelers: data.travelRequirements.numberOfTravelers,
            },
            days: data.itinerary.days,
            markup: data.pricingTerms.costBreakdown.markup,
            currency: data.pricingTerms.currency,
          });
        }
      } catch (error) {
        console.error("Error loading quotation data:", error);
        // Optionally show error message to user
      } finally {
        setIsLoadingData(false);
      }
    };

    loadQuotationData();
  }, [
    id,
    setBasicDetails,
    setTravelRequirements,
    setItinerary,
    setPricingTerms,
    loadItinerary,
  ]);

  const handleStepChange = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const handleNext = async () => {
    // Validate current step before proceeding
    const isValid = validateCurrentStep(currentStep);
    if (!isValid) {
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
        id: id, // Include the ID for updating
      };

      // In a real app with backend API:
      // const response = await api.put(`/quotations/${id}`, completeQuotation);

      console.log("Updating quotation:", completeQuotation);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Don't clear stores after successful update (unlike create)
      // resetQuotation();
      // clearItinerary();

      // Redirect to quotations list
      navigate("/quotations");
    } catch (error) {
      console.error("Error updating quotation:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while fetching data
  if (isLoadingData) {
    return (
      <Page title="Edit Quotation - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
          <div className="min-w-0 space-y-6">
            <div className="flex items-center gap-4">
              <Button
                component={Link}
                to="/quotations"
                variant="soft"
                color="neutral"
                isIcon
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="dark:text-dark-50 text-2xl font-bold tracking-wide text-gray-800">
                  Loading Quotation...
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center py-12">
              <div className="border-primary-600 h-8 w-8 animate-spin rounded-full border-b-2"></div>
            </div>
          </div>
        </div>
      </Page>
    );
  }

  // Get current step component
  const CurrentStepComponent = quotationSteps[currentStep].component;

  return (
    <Page title="Edit Quotation - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                component={Link}
                to="/quotations"
                variant="soft"
                color="neutral"
                isIcon
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <Breadcrumbs items={breadcrumbItems} />
                <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                  Edit: {quotationTitle || `Quotation #${id}`}
                </h1>
                <p className="dark:text-dark-200 text-gray-600">
                  Update quotation details using the step-by-step form
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
            completeButtonText="Update Quotation"
          >
            <CurrentStepComponent />
          </MultiStepForm>
        </div>
      </div>
    </Page>
  );
}
