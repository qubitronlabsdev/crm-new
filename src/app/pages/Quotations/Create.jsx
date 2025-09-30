// Import Dependencies
import { useState } from "react";
import {
  Link,
  // useNavigate
} from "react-router";
import { ArrowLeftIcon, SaveIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card, Input, Textarea } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
// import { ItineraryBuilder } from "features/Quotations/components/ItineraryBuilder";
// import { useItineraryStore } from "features/Quotations/store/useItineraryStore";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Quotations", href: "/quotations" },
  { label: "Create Quotation" },
];

// ----------------------------------------------------------------------

console.log("Rendering CreateQuotation component");

export default function CreateQuotation() {
  // const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isLoading, _setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [quotationData, setQuotationData] = useState({
    title: "",
    description: "",
    customer_name: "",
    customer_email: "",
    valid_until: "",
  });

  // const { exportItinerary, clearItinerary } = useItineraryStore();

  // const handleInputChange = (field, value) => {
  //   setQuotationData((prev) => ({
  //     ...prev,
  //     [field]: value,
  //   }));
  // };

  // const handleSaveQuotation = async () => {
  //   setIsLoading(true);

  //   try {
  //     const itineraryData = exportItinerary();
  //     const completeQuotation = {
  //       ...quotationData,
  //       ...itineraryData,
  //     };

  //     // In a real app with Inertia.js, you would use:
  //     // router.post('/quotations', completeQuotation)

  //     console.log("Saving quotation:", completeQuotation);

  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1500));

  //     // Clear the store after successful save
  //     clearItinerary();

  //     // Redirect to leads list
  //     navigate("/leads");
  //   } catch (error) {
  //     console.error("Error saving quotation:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <Page title="Create Quotation - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                component={Link}
                to="/leads"
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
                  Build a detailed itinerary with pricing for the client
                </p>
              </div>
            </div>
            <Button
              // onClick={handleSaveQuotation}
              color="primary"
              isLoading={isLoading}
              disabled={isLoading}
              className="shrink-0"
            >
              <SaveIcon className="mr-2 h-5 w-5" />
              Save Quotation
            </Button>
          </div>

          {/* Quotation Details */}
          <Card className="p-6">
            <h2 className="dark:text-dark-50 mb-4 text-lg font-semibold text-gray-800">
              Quotation Details
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="Quotation Title"
                placeholder="e.g., Paris Romantic Getaway"
                value={quotationData.title}
                // onChange={(e) => handleInputChange("title", e.target.value)}
              />
              <Input
                label="Customer Name"
                placeholder="Enter customer name"
                value={quotationData.customer_name}
                // onChange={(e) =>
                //   handleInputChange("customer_name", e.target.value)
                // }
              />
              <Input
                label="Customer Email"
                type="email"
                placeholder="Enter customer email"
                value={quotationData.customer_email}
                // onChange={(e) =>
                //   handleInputChange("customer_email", e.target.value)
                // }
              />
              <Input
                label="Valid Until"
                type="date"
                value={quotationData.valid_until}
                // onChange={(e) =>
                //   handleInputChange("valid_until", e.target.value)
                // }
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Description"
                  placeholder="Brief description of the travel package"
                  rows={3}
                  value={quotationData.description}
                  // onChange={(e) =>
                  //   handleInputChange("description", e.target.value)
                  // }
                />
              </div>
            </div>
          </Card>

          {/* Itinerary Builder */}
          {/* <ItineraryBuilder /> */}
        </div>
      </div>
    </Page>
  );
}
