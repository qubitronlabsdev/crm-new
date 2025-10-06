// Import Dependencies
import { useState, useEffect } from "react";
import { useParams } from "react-router";

// Local Imports
import { Page } from "components/shared/Page";
import { QuotationStepper } from "features/Quotations/components/QuotationStepper";

// ----------------------------------------------------------------------

export default function EditQuotation() {
  const { id } = useParams();
  const [quotationData, setQuotationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quotation data
  useEffect(() => {
    const fetchQuotationData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Mock API call to fetch quotation data
        // Replace with actual API call: const response = await quotationAPI.getById(id);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

        const mockQuotationData = {
          id: id,
          lead_id: "lead_123",
          travel_date: "2024-02-14",
          expected_close_date: "2024-02-01",
          departure_city: "New York",
          destination: "Paris, France",
          days: 5,
          nights: 4,
          adults: 2,
          children: 0,
          children_age: "",
          budget: 3000,
          travel_preferences: "Anniversary celebration, prefer quiet rooms",
          hotel_rating: "5",
          room_type: "suite",
          meal_plan: "Bed & Breakfast",
          transportation_mode: "flight",
          transportation_charges: [
            { description: "Round-trip flights", amount: 1200 },
            { description: "Airport transfers", amount: 120 },
          ],
          base_package_price: 2800,
          taxes_services_charges: 18,
          total_package_price: 3304,
          per_person_price: 1652,
          payment_terms: "50_50",
          pricing_notes: "Early bird discount applied",
          inclusions: [
            "Accommodation as per itinerary",
            "Daily breakfast at hotel",
            "Airport transfers",
          ],
          exclusions: [
            "International flights (quoted separately)",
            "Personal expenses and shopping",
            "Visa fees",
          ],
          cancellation_policy: "Free cancellation up to 30 days before travel",
          terms_conditions: "All bookings are subject to availability",
          template_selection: "template_2",
          // Additional quotation metadata
          created_at: "2024-01-15T10:30:00Z",
          updated_at: "2024-01-16T14:22:00Z",
          status: "draft",
          version: 1,
        };

        setQuotationData(mockQuotationData);
      } catch (err) {
        console.error("Error fetching quotation data:", err);
        setError("Failed to load quotation data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchQuotationData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Page title={`Edit Quotation #${id} - Travel CRM`}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading quotation data...
            </p>
          </div>
        </div>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title={`Edit Quotation #${id} - Travel CRM`}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-red-600">
              <svg
                className="mx-auto mb-2 h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.314 17.5C3.544 18.833 4.506 20.5 6.046 20.5z"
                />
              </svg>
            </div>
            <p className="mb-4 text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </Page>
    );
  }

  if (!quotationData) {
    return (
      <Page title={`Edit Quotation #${id} - Travel CRM`}>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Quotation not found.
            </p>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`Edit Quotation #${id} - Travel CRM`}>
      <QuotationStepper
        quotationId={id}
        initialData={quotationData}
        isEditMode={true}
      />
    </Page>
  );
}
