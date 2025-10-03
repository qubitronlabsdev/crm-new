// Import Dependencies
import { useEffect } from "react";

// Local Imports
import { Card } from "components/ui";
import { ItineraryBuilder } from "../ItineraryBuilder";
import { useQuotationStore } from "../../store/useQuotationStore";
import { useItineraryStore } from "../../store/useItineraryStore";

// ----------------------------------------------------------------------

export function ItineraryPlanningStep() {
  const { basicDetails, travelRequirements, setItinerary } =
    useQuotationStore();
  const { days, loadItinerary } = useItineraryStore();

  // Initialize itinerary with basic travel data
  useEffect(() => {
    if (
      travelRequirements.destination &&
      travelRequirements.duration > 0 &&
      days.length === 0
    ) {
      // Create initial days based on travel duration
      const initialData = {
        quotation: {
          title: basicDetails.title,
          destination: travelRequirements.destination,
          duration: travelRequirements.duration,
          travelers: travelRequirements.numberOfTravelers,
        },
        days: [],
        markup: 20,
        currency: "USD",
      };

      loadItinerary(initialData);
    }
  }, [
    travelRequirements.destination,
    travelRequirements.duration,
    days.length,
    basicDetails.title,
    travelRequirements.numberOfTravelers,
    loadItinerary,
  ]);

  // Sync itinerary data with quotation store for validation
  useEffect(() => {
    setItinerary({ days });
  }, [days, setItinerary]);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Detailed Day-wise Itinerary Planning
        </h3>
        <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h4 className="mb-2 font-medium text-blue-900 dark:text-blue-200">
            Trip Overview
          </h4>
          <div className="grid grid-cols-1 gap-2 text-sm text-blue-800 md:grid-cols-3 dark:text-blue-300">
            <div>
              <span className="font-medium">Destination:</span>{" "}
              {travelRequirements.destination || "Not set"}
            </div>
            <div>
              <span className="font-medium">Duration:</span>{" "}
              {travelRequirements.duration > 0
                ? `${travelRequirements.duration} days`
                : "Not set"}
            </div>
            <div>
              <span className="font-medium">Travelers:</span>{" "}
              {travelRequirements.numberOfTravelers || 0} people
            </div>
          </div>
        </div>
      </Card>

      {/* Planning Instructions */}
      <Card className="p-6">
        <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
          Itinerary Planning Guide
        </h4>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-start gap-2">
            <div className="bg-primary-500 mt-1 h-2 w-2 rounded-full"></div>
            <div>
              <strong>Hotel Information:</strong> Add accommodations with star
              ratings, room types, and meal plans
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-primary-500 mt-1 h-2 w-2 rounded-full"></div>
            <div>
              <strong>Transportation:</strong> Include flights, transfers, and
              local transport details
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-primary-500 mt-1 h-2 w-2 rounded-full"></div>
            <div>
              <strong>Activities:</strong> Plan sightseeing, tours, and
              experiences for each day
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="bg-primary-500 mt-1 h-2 w-2 rounded-full"></div>
            <div>
              <strong>Timing:</strong> Add specific times for pickups,
              check-ins, and activities
            </div>
          </div>
        </div>
      </Card>

      {/* Itinerary Builder */}
      <ItineraryBuilder />

      {/* Quick Summary */}
      {days.length > 0 && (
        <Card className="p-6">
          <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
            Itinerary Summary
          </h4>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-3">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Total Days:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {days.length}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Total Items:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {days.reduce(
                    (total, day) => total + (day.items?.length || 0),
                    0,
                  )}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Status:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {days.length > 0 ? "In Progress" : "Not Started"}
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
