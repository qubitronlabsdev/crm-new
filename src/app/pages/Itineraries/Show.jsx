// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  PencilIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card, Badge } from "components/ui";
import { Page } from "components/shared/Page";
import { ROUTES } from "app/router/routes";
import { itineraryApi } from "features/Itineraries/lib/itineraryUtils";

// ----------------------------------------------------------------------

export default function ShowItinerary() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load itinerary data based on ID
    if (id) {
      const loadItinerary = async () => {
        try {
          setIsLoading(true);
          const itineraryData = await itineraryApi.getItineraryById(id);
          setItinerary(itineraryData);
        } catch (error) {
          console.error("Error loading itinerary:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadItinerary();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Page title="Itinerary Details - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">
              Loading itinerary details...
            </div>
          </div>
        </div>
      </Page>
    );
  }

  if (!itinerary) {
    return (
      <Page title="Itinerary Not Found - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">
              Itinerary not found.
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`${itinerary.title} - Travel CRM`}>
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
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
                  {itinerary.title}
                </h1>
                <p className="dark:text-dark-200 text-gray-600">
                  {itinerary.customer_name} • {itinerary.duration_days} days
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outlined"
                color="neutral"
                leftIcon={<DocumentTextIcon className="h-4 w-4" />}
                onClick={() =>
                  console.log("Generate document for itinerary:", id)
                }
              >
                Generate Document
              </Button>
              <Button
                component={Link}
                to={ROUTES.ITINERARIES.EDIT(id)}
                color="primary"
                leftIcon={<PencilIcon className="h-4 w-4" />}
              >
                Edit Itinerary
              </Button>
            </div>
          </div>

          {/* Itinerary Details */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Basic Information */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Itinerary Overview
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {itinerary.title}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {itinerary.description}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Destination
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {itinerary.destination}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Departure City
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {itinerary.departure_city}
                  </p>
                </div>
              </div>
            </Card>

            {/* Customer Information */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Customer Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Customer Name
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {itinerary.customer_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {itinerary.customer_email}
                  </p>
                </div>
              </div>
            </Card>

            {/* Travel Details */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Travel Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Travel Dates
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(itinerary.start_date).toLocaleDateString()} -{" "}
                    {new Date(itinerary.end_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Duration
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {itinerary.duration_days} days
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Total Cost
                  </label>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    ${itinerary.total_cost?.toLocaleString()}
                  </p>
                </div>
                {itinerary.accommodation_type && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Accommodation
                    </label>
                    <p className="text-gray-900 capitalize dark:text-white">
                      {itinerary.accommodation_type}
                    </p>
                  </div>
                )}
                {itinerary.transportation_mode && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Transportation
                    </label>
                    <p className="text-gray-900 capitalize dark:text-white">
                      {itinerary.transportation_mode?.replace("_", " ")}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Management Details */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Management Details
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <div>
                    <Badge
                      color={
                        itinerary.status === "confirmed"
                          ? "success"
                          : itinerary.status === "pending"
                            ? "warning"
                            : itinerary.status === "cancelled"
                              ? "error"
                              : "neutral"
                      }
                      className="capitalize"
                      variant="soft"
                    >
                      {itinerary.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </label>
                  <div>
                    <Badge
                      color={
                        itinerary.priority === "high" ||
                        itinerary.priority === "urgent"
                          ? "error"
                          : itinerary.priority === "medium"
                            ? "warning"
                            : "info"
                      }
                      className="capitalize"
                      variant="soft"
                    >
                      {itinerary.priority}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Assigned Agent
                  </label>
                  <p className="text-gray-900 capitalize dark:text-white">
                    {itinerary.agent_assigned?.replace("_", " ")}
                  </p>
                </div>
              </div>
            </Card>

            {/* Additional Information */}
            {(itinerary.special_requirements || itinerary.notes) && (
              <Card className="p-6 lg:col-span-2">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  {itinerary.special_requirements && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Special Requirements
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {itinerary.special_requirements}
                      </p>
                    </div>
                  )}
                  {itinerary.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Notes
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {itinerary.notes}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
