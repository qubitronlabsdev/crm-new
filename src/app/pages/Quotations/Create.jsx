// Import Dependencies
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

// Local Imports
import { Page } from "components/shared/Page";
import { QuotationStepper } from "features/Quotations/components/QuotationStepper";

// ----------------------------------------------------------------------

export default function CreateQuotation() {
  const [searchParams] = useSearchParams();
  const leadId = searchParams.get("leadId");
  const [leadData, setLeadData] = useState(null);
  const [isLoading, setIsLoading] = useState(!!leadId);
  const [error, setError] = useState(null);

  // Fetch lead data if leadId is provided
  useEffect(() => {
    const fetchLeadData = async () => {
      if (!leadId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Mock API call to fetch lead data
        // Replace with actual API call: const response = await leadAPI.getById(leadId);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay

        const mockLeadData = {
          id: leadId,
          lead_id: leadId,
          travel_date: "2024-03-15",
          departure_city: "Los Angeles",
          destination: "Tokyo, Japan",
          days: 7,
          nights: 6,
          adults: 2,
          children: 1,
          children_age: "8",
          budget: 5000,
          travel_preferences:
            "Vegetarian meals required, cultural experiences preferred",
          taxes_services_charges: 18,
          // Additional lead-specific data
          lead_source: "Website",
          lead_status: "qualified",
          customer_name: "John Doe",
          customer_email: "john.doe@example.com",
          customer_phone: "+1-555-0123",
        };

        setLeadData(mockLeadData);
      } catch (err) {
        console.error("Error fetching lead data:", err);
        setError("Failed to load lead data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeadData();
  }, [leadId]);

  if (isLoading) {
    return (
      <Page title="Create Quotation - Travel CRM">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-gray-600 dark:text-gray-400">
              {leadId ? "Loading lead data..." : "Loading..."}
            </p>
          </div>
        </div>
      </Page>
    );
  }

  if (error) {
    return (
      <Page title="Create Quotation - Travel CRM">
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

  return (
    <Page title="Create Quotation - Travel CRM">
      <QuotationStepper
        leadId={leadId}
        initialData={leadData}
        isEditMode={false}
      />
    </Page>
  );
}
