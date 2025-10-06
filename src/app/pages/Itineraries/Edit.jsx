// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { ItineraryForm } from "features/Itineraries/components/ItineraryForm";
import { ROUTES } from "app/router/routes";
import {
  itineraryApi,
  transformItineraryToFormData,
} from "features/Itineraries/lib/itineraryUtils";

// ----------------------------------------------------------------------

export default function EditItinerary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Load itinerary data based on ID
    if (id) {
      console.log("Loading itinerary with ID:", id);
      const loadItinerary = async () => {
        try {
          setIsPageLoading(true);
          const itineraryData = await itineraryApi.getItineraryById(id);
          console.log("Found itinerary data:", itineraryData);
          if (itineraryData) {
            // Transform itinerary data to form format and set it
            const formData = transformItineraryToFormData(itineraryData);
            console.log("Transformed form data:", formData);
            setItinerary(formData);
          } else {
            console.error(`Itinerary with ID ${id} not found`);
            // Optionally redirect to itineraries list or show error
            navigate(ROUTES.ITINERARIES.ALL);
          }
        } catch (error) {
          console.error("Error loading itinerary:", error);
          navigate(ROUTES.ITINERARIES.ALL);
        } finally {
          setIsPageLoading(false);
        }
      };

      loadItinerary();
    }
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Update itinerary via API
      await itineraryApi.updateItinerary(id, data);

      console.log("Updating itinerary with data:", data);

      // Redirect to itineraries list after successful update
      navigate(ROUTES.ITINERARIES.ALL);
    } catch (error) {
      console.error("Error updating itinerary:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <Page title="Edit Itinerary - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">
              Loading itinerary data...
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Edit Itinerary - Travel CRM">
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
                Edit Itinerary {itinerary?.title ? `- ${itinerary.title}` : ""}
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Update travel itinerary details and information
              </p>
            </div>
          </div>

          {/* Itinerary Form */}
          <ItineraryForm
            initialData={itinerary}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isEditMode={true}
          />
        </div>
      </div>
    </Page>
  );
}
