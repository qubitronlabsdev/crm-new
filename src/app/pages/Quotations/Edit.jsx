// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon, SaveIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card, Input, Textarea } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { ItineraryBuilder } from "features/Quotations/components/ItineraryBuilder";
import { useItineraryStore } from "features/Quotations/store/useItineraryStore";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Quotations", href: "/quotations" },
  { label: "Edit Quotation" },
];

// Mock data - in real app this would come from Inertia.js props
const mockQuotation = {
  id: 1,
  title: "Paris Romantic Getaway",
  description: "A beautiful 5-day romantic trip to Paris",
  customer_name: "John Smith",
  customer_email: "john.smith@email.com",
  valid_until: "2024-03-15",
  days: [
    {
      id: 1,
      dayNumber: 1,
      title: "Day 1: Arrival in Paris",
      description: "Arrival and check-in",
      items: [
        {
          id: 1,
          type: "flight",
          title: "Flight to Paris",
          description: "Economy class flight",
          cost: 800,
          time: "10:00 AM",
          location: "Charles de Gaulle Airport",
          notes: "Includes meal and entertainment",
        },
        {
          id: 2,
          type: "hotel",
          title: "Hotel Check-in",
          description: "Luxury hotel in city center",
          cost: 250,
          time: "3:00 PM",
          location: "Le Meurice Hotel",
          notes: "Superior room with city view",
        },
      ],
    },
  ],
  markup: 20,
  currency: "USD",
};

// ----------------------------------------------------------------------

export default function EditQuotation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [quotationData, setQuotationData] = useState({
    title: "",
    description: "",
    customer_name: "",
    customer_email: "",
    valid_until: "",
  });

  const { exportItinerary, loadItinerary } = useItineraryStore();

  useEffect(() => {
    // In real app, quotation data would come from Inertia.js props
    const quotation = mockQuotation;

    setQuotationData({
      title: quotation.title,
      description: quotation.description,
      customer_name: quotation.customer_name,
      customer_email: quotation.customer_email,
      valid_until: quotation.valid_until,
    });

    // Load itinerary data into the store
    loadItinerary({
      quotation: quotation,
      days: quotation.days,
      markup: quotation.markup,
      currency: quotation.currency,
    });
  }, [id, loadItinerary]);

  const handleInputChange = (field, value) => {
    setQuotationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveQuotation = async () => {
    setIsLoading(true);

    try {
      const itineraryData = exportItinerary();
      const completeQuotation = {
        ...quotationData,
        ...itineraryData,
      };

      // In a real app with Inertia.js, you would use:
      // router.patch(`/quotations/${id}`, completeQuotation)

      console.log("Updating quotation:", completeQuotation);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to quotations list
      navigate("/quotations");
    } catch (error) {
      console.error("Error updating quotation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page title="Edit Quotation - Travel CRM">
      <div className="space-y-6">
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
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                Edit Quotation #{id}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Update travel itinerary and quotation details
              </p>
            </div>
          </div>
          <Button
            onClick={handleSaveQuotation}
            color="primary"
            isLoading={isLoading}
            disabled={isLoading}
            className="shrink-0"
          >
            <SaveIcon className="mr-2 h-5 w-5" />
            Update Quotation
          </Button>
        </div>

        {/* Quotation Details */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Quotation Details
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Quotation Title"
              placeholder="e.g., Paris Romantic Getaway"
              value={quotationData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
            <Input
              label="Customer Name"
              placeholder="Enter customer name"
              value={quotationData.customer_name}
              onChange={(e) =>
                handleInputChange("customer_name", e.target.value)
              }
            />
            <Input
              label="Customer Email"
              type="email"
              placeholder="Enter customer email"
              value={quotationData.customer_email}
              onChange={(e) =>
                handleInputChange("customer_email", e.target.value)
              }
            />
            <Input
              label="Valid Until"
              type="date"
              value={quotationData.valid_until}
              onChange={(e) => handleInputChange("valid_until", e.target.value)}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Description"
                placeholder="Brief description of the travel package"
                rows={3}
                value={quotationData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
          </div>
        </Card>

        {/* Itinerary Builder */}
        <ItineraryBuilder />
      </div>
    </Page>
  );
}
