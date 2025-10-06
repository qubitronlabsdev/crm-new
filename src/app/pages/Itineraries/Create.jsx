// Import Dependencies
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { ItineraryForm } from "features/Itineraries/components/ItineraryForm";
import { ROUTES } from "app/router/routes";
import { itineraryApi } from "features/Itineraries/lib/itineraryUtils";

// ----------------------------------------------------------------------

export default function CreateItinerary() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Create itinerary via API
      await itineraryApi.createItinerary(data);

      // Navigate to itineraries list after successful creation
      navigate(ROUTES.ITINERARIES.ALL);
    } catch (error) {
      console.error("Error creating itinerary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page title="Create Itinerary - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              component={Link}
              to={ROUTES.ITINERARIES.ALL}
              variant="outlined"
              color="neutral"
              className="shrink-0 p-1"
              isIcon
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Create New Itinerary
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Create a comprehensive travel itinerary for your customer
              </p>
            </div>
          </div>

          {/* Itinerary Form */}
          <ItineraryForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </Page>
  );
}
