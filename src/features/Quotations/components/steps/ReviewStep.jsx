// Import Dependencies
import { useState, useEffect } from "react";

// Local Imports
import { Card, Button } from "components/ui";

// Import React Select for template selection
import ReactSelect from "react-select";

// ----------------------------------------------------------------------

// Mock PDF templates - in real app, fetch from API
const mockPdfTemplates = [
  { value: "template_1", label: "Classic Travel Template" },
  { value: "template_2", label: "Modern Business Template" },
  { value: "template_3", label: "Luxury Travel Template" },
  { value: "template_4", label: "Adventure Package Template" },
  { value: "template_5", label: "Family Holiday Template" },
];

// ----------------------------------------------------------------------

export function ReviewStep({ watch, onSubmit, isSubmitting }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [availableTemplates, setAvailableTemplates] = useState([]);

  // Fetch available PDF templates
  useEffect(() => {
    // In real app, make API call to fetch templates
    // For now, use mock data
    setAvailableTemplates(mockPdfTemplates);
  }, []);

  // Get all form data for display
  const allData = watch();

  // Helper function to format data display
  const formatValue = (value) => {
    if (value === null || value === undefined || value === "")
      return "Not specified";
    if (typeof value === "number") return value.toLocaleString();
    if (Array.isArray(value))
      return value.filter((item) => item && item.trim()).join(", ");
    return value;
  };

  const handleGenerateQuotation = () => {
    if (!selectedTemplate) {
      alert("Please select a PDF template first");
      return;
    }

    const finalData = {
      ...allData,
      pdf_template: selectedTemplate.value,
    };

    onSubmit(finalData);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Step 5: Review & Generate Quotation
        </h3>

        {/* Travel Details Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-semibold text-gray-800 dark:text-gray-200">
            🧳 Travel Details
          </h4>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Travel Date:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.travel_date)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Travel Time:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.travel_time)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Departure:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.departure_city)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Destination:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.destination)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Duration:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {allData.days} days, {allData.nights} nights
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Travelers:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {allData.adults} adults, {allData.children} children
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Budget:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  ₹{formatValue(allData.budget)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Expected Close:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.expected_close_date)}
                </span>
              </div>
            </div>
            {allData.special_requests && (
              <div className="mt-3 border-t border-gray-300 pt-3 dark:border-gray-600">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Special Requests:
                </span>
                <p className="mt-1 ml-2 text-gray-900 dark:text-white">
                  {allData.special_requests}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hotels & Transportation Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-semibold text-gray-800 dark:text-gray-200">
            🏨 Hotels & Transportation
          </h4>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Hotel Rating:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.hotel_rating)} Star
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Room Type:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.room_type)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Meal Plan:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.meal_plan)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Transportation:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.transportation_mode)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Cost & Pricing Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-semibold text-gray-800 dark:text-gray-200">
            💰 Cost & Pricing
          </h4>
          <div className="rounded-lg bg-gradient-to-r from-green-50 to-blue-50 p-4 dark:from-gray-800 dark:to-gray-700">
            <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Base Package Price:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  ₹{formatValue(allData.base_package_price)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Taxes & Charges:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.taxes_services_charges)}%
                </span>
              </div>
              <div>
                <span className="font-bold text-green-700 dark:text-green-300">
                  Total Package Price:
                </span>
                <span className="ml-2 font-bold text-green-900 dark:text-green-100">
                  ₹{formatValue(allData.total_package_price)}
                </span>
              </div>
              <div>
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  Per Person Price:
                </span>
                <span className="ml-2 font-bold text-blue-900 dark:text-blue-100">
                  ₹{formatValue(allData.per_person_price)}
                </span>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Payment Terms:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.payment_terms)}
                </span>
              </div>
            </div>
            {allData.pricing_notes && (
              <div className="mt-3 border-t border-gray-300 pt-3 dark:border-gray-600">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Pricing Notes:
                </span>
                <p className="mt-1 ml-2 text-gray-900 dark:text-white">
                  {allData.pricing_notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Inclusions & Exclusions Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-semibold text-gray-800 dark:text-gray-200">
            📋 Inclusions & Exclusions
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <h5 className="mb-2 font-medium text-green-800 dark:text-green-300">
                ✅ Inclusions
              </h5>
              <ul className="space-y-1 text-sm text-green-700 dark:text-green-200">
                {(allData.inclusions || []).map(
                  (item, index) =>
                    item && (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ),
                )}
              </ul>
            </div>
            <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
              <h5 className="mb-2 font-medium text-red-800 dark:text-red-300">
                ❌ Exclusions
              </h5>
              <ul className="space-y-1 text-sm text-red-700 dark:text-red-200">
                {(allData.exclusions || []).map(
                  (item, index) =>
                    item && (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ),
                )}
              </ul>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
              <h5 className="mb-2 font-medium text-yellow-800 dark:text-yellow-300">
                📋 Cancellation Policy
              </h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                {formatValue(allData.cancellation_policy)}
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h5 className="mb-2 font-medium text-blue-800 dark:text-blue-300">
                📄 Terms & Conditions
              </h5>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                {formatValue(allData.terms_conditions)}
              </p>
            </div>
          </div>
        </div>

        {/* PDF Template Selection */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-semibold text-gray-800 dark:text-gray-200">
            📄 PDF Template Selection
          </h4>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select PDF Template *
            </label>
            <ReactSelect
              value={selectedTemplate}
              onChange={setSelectedTemplate}
              options={availableTemplates}
              placeholder="Choose a template for your quotation PDF..."
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
              isSearchable
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB",
                  "&:hover": {
                    borderColor: "#3B82F6",
                  },
                }),
              }}
            />
            {!selectedTemplate && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                Please select a PDF template to generate the quotation
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.print()}
          >
            🖨️ Print Preview
          </Button>

          <Button
            type="button"
            onClick={handleGenerateQuotation}
            disabled={!selectedTemplate || isSubmitting}
            className="min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <span className="mr-2 animate-spin">⏳</span>
                Generating...
              </>
            ) : (
              <>🚀 Generate Quotation PDF</>
            )}
          </Button>
        </div>
      </Card>
    </div>
  );
}
