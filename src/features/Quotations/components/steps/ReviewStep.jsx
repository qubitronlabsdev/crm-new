// Import Dependencies
import { useState, useEffect } from "react";
import {
  BuildingOfficeIcon,
  CurrencyDollarIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  PrinterIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Card, Button } from "components/ui";

// Import React Select for template selection
import ReactSelect from "react-select";

// Dark theme CSS variables for ReactSelect
const darkThemeStyles = `
  :root {
    --select-bg: #ffffff;
    --select-border: #D1D5DB;
    --select-text: #111827;
    --select-placeholder: #6B7280;
    --select-menu-bg: #ffffff;
    --select-option-hover: #F3F4F6;
  }
  
  .dark {
    --select-bg: #374151;
    --select-border: #4B5563;
    --select-text: #F9FAFB;
    --select-placeholder: #9CA3AF;
    --select-menu-bg: #374151;
    --select-option-hover: #4B5563;
  }
`;

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

export function ReviewStep({ errors, watch, setValue, defaultData = {} }) {
  const [availableTemplates, setAvailableTemplates] = useState([]);

  // Inject dark theme styles for ReactSelect
  useEffect(() => {
    const styleId = "react-select-dark-theme";
    let styleElement = document.getElementById(styleId);

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.textContent = darkThemeStyles;
      document.head.appendChild(styleElement);
    }

    return () => {
      // Cleanup is handled by keeping the styles in head for reuse
    };
  }, []);
  // Handle defaultData when provided
  useEffect(() => {
    if (defaultData && Object.keys(defaultData).length > 0) {
      // Set form values from defaultData when provided
      Object.keys(defaultData).forEach((key) => {
        if (defaultData[key] !== undefined) {
          setValue(key, defaultData[key], { shouldValidate: false });
        }
      });
    }
  }, [defaultData, setValue]);

  // Fetch available PDF templates
  useEffect(() => {
    // In real app, make API call to fetch templates
    // For now, use mock data
    setAvailableTemplates(mockPdfTemplates);
  }, []);

  // Get all form data for display
  const allData = watch();
  const selectedTemplate = watch("template_selection");

  // Helper function to format data display
  const formatValue = (value) => {
    if (value === null || value === undefined || value === "")
      return "Not specified";
    if (typeof value === "number") return value.toLocaleString();
    if (Array.isArray(value))
      return value.filter((item) => item && item.trim()).join(", ");
    return value;
  };

  // Handle template selection
  const handleTemplateChange = (selectedOption) => {
    setValue("template_selection", selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Step 5: Review & Generate Quotation
        </h3>

        {/* Debug Section - Remove in production */}
        {/* <div className="mb-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <h5 className="text-sm font-medium text-blue-800 dark:text-blue-300">
            Debug Info - Form Data:
          </h5>
          <pre className="mt-2 max-h-32 overflow-y-auto text-xs text-blue-700 dark:text-blue-400">
            {JSON.stringify(allData, null, 2)}
          </pre>
          <div className="mt-2">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Errors: {JSON.stringify(errors, null, 2)}
            </p>
          </div>
        </div> */}

        {/* Travel Details Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
            <BriefcaseIcon className="h-5 w-5" />
            Travel Details
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
              {/* <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Travel Time:
                </span>
                <span className="ml-2 text-gray-900 dark:text-white">
                  {formatValue(allData.travel_time)}
                </span>
              </div> */}
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
            {allData.travel_preferences && (
              <div className="mt-3 border-t border-gray-300 pt-3 dark:border-gray-600">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Travel Preferences:
                </span>
                <p className="mt-1 ml-2 text-gray-900 dark:text-white">
                  {allData.travel_preferences}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Hotels & Transportation Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
            <BuildingOfficeIcon className="h-5 w-5" />
            Hotels & Transportation
          </h4>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            {/* Hotels Section */}
            <div className="mb-4">
              <h5 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                🏨 Hotels
              </h5>
              {allData.hotelsNotIncluded ? (
                <p className="text-sm text-gray-600 italic dark:text-gray-400">
                  Hotels not included in this package
                </p>
              ) : (
                <div className="space-y-2">
                  {(allData.hotels || []).map((hotel, index) => (
                    <div
                      key={index}
                      className="rounded border bg-white p-3 dark:bg-gray-700"
                    >
                      <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-3">
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Hotel:
                          </span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {hotel.hotelName || "Not specified"}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            City:
                          </span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {hotel.city || "Not specified"}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Category:
                          </span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {hotel.category || "Not specified"}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            Nights:
                          </span>
                          <span className="ml-2 text-gray-900 dark:text-white">
                            {(hotel.nights || []).join(", ") || "Not specified"}
                          </span>
                        </div>
                        {hotel.roomType && (
                          <div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Room Type:
                            </span>
                            <span className="ml-2 text-gray-900 dark:text-white">
                              {hotel.roomType}
                            </span>
                          </div>
                        )}
                        {hotel.comment && (
                          <div className="md:col-span-3">
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                              Comments:
                            </span>
                            <span className="ml-2 text-gray-900 dark:text-white">
                              {hotel.comment}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Transportation Section */}
            <div>
              <h5 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                🚗 Transportation
              </h5>
              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                {/* Flight */}
                <div className="rounded border bg-white p-3 dark:bg-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Flight:
                    </span>
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        allData.transportation?.flightNotIncluded
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      }`}
                    >
                      {allData.transportation?.flightNotIncluded
                        ? "Not Included"
                        : "Included"}
                    </span>
                  </div>
                  {!allData.transportation?.flightNotIncluded &&
                    allData.transportation?.flight && (
                      <p className="text-xs text-gray-900 dark:text-white">
                        {allData.transportation.flight}
                      </p>
                    )}
                </div>

                {/* Cab */}
                <div className="rounded border bg-white p-3 dark:bg-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Cab:
                    </span>
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        allData.transportation?.cabNotIncluded
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      }`}
                    >
                      {allData.transportation?.cabNotIncluded
                        ? "Not Included"
                        : "Included"}
                    </span>
                  </div>
                  {!allData.transportation?.cabNotIncluded &&
                    allData.transportation?.cab && (
                      <p className="text-xs text-gray-900 dark:text-white">
                        {allData.transportation.cab}
                      </p>
                    )}
                </div>

                {/* Bus */}
                <div className="rounded border bg-white p-3 dark:bg-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Bus:
                    </span>
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        allData.transportation?.busNotIncluded
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      }`}
                    >
                      {allData.transportation?.busNotIncluded
                        ? "Not Included"
                        : "Included"}
                    </span>
                  </div>
                  {!allData.transportation?.busNotIncluded &&
                    allData.transportation?.bus && (
                      <p className="text-xs text-gray-900 dark:text-white">
                        {allData.transportation.bus}
                      </p>
                    )}
                </div>

                {/* Train */}
                <div className="rounded border bg-white p-3 dark:bg-gray-700">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Train:
                    </span>
                    <span
                      className={`rounded px-2 py-1 text-xs ${
                        allData.transportation?.trainNotIncluded
                          ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                      }`}
                    >
                      {allData.transportation?.trainNotIncluded
                        ? "Not Included"
                        : "Included"}
                    </span>
                  </div>
                  {!allData.transportation?.trainNotIncluded &&
                    allData.transportation?.train && (
                      <p className="text-xs text-gray-900 dark:text-white">
                        {allData.transportation.train}
                      </p>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cost & Pricing Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
            <CurrencyDollarIcon className="h-5 w-5" />
            Cost & Pricing
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
            {/* {allData.pricing_notes && (
              <div className="mt-3 border-t border-gray-300 pt-3 dark:border-gray-600">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Pricing Notes:
                </span>
                <p className="mt-1 ml-2 text-gray-900 dark:text-white">
                  {allData.pricing_notes}
                </p>
              </div>
            )} */}
          </div>
        </div>

        {/* Inclusions & Exclusions Review */}
        <div className="mb-6">
          <h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
            <ClipboardDocumentListIcon className="h-5 w-5" />
            Inclusions & Exclusions
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <h5 className="mb-2 flex items-center gap-2 font-medium text-green-800 dark:text-green-300">
                <CheckCircleIcon className="h-4 w-4" />
                Inclusions
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
              <h5 className="mb-2 flex items-center gap-2 font-medium text-red-800 dark:text-red-300">
                <XCircleIcon className="h-4 w-4" />
                Exclusions
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
              <h5 className="mb-2 flex items-center gap-2 font-medium text-yellow-800 dark:text-yellow-300">
                <ClipboardDocumentListIcon className="h-4 w-4" />
                Cancellation Policy
              </h5>
              <p className="text-sm text-yellow-700 dark:text-yellow-200">
                {formatValue(allData.cancellation_policy)}
              </p>
            </div>
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <h5 className="mb-2 flex items-center gap-2 font-medium text-blue-800 dark:text-blue-300">
                <ClipboardDocumentListIcon className="h-4 w-4" />
                Terms & Conditions
              </h5>
              <p className="text-sm text-blue-700 dark:text-blue-200">
                {formatValue(allData.terms_conditions)}
              </p>
            </div>
          </div>
        </div>

        {/* PDF Template Selection */}
        <div className="mb-6">
          <h4 className="text-md mb-3 flex items-center gap-2 font-semibold text-gray-800 dark:text-gray-200">
            <ClipboardDocumentListIcon className="h-5 w-5" />
            PDF Template Selection
          </h4>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select PDF Template *
            </label>
            <ReactSelect
              value={
                availableTemplates.find(
                  (option) => option.value === selectedTemplate,
                ) || null
              }
              onChange={handleTemplateChange}
              options={availableTemplates}
              placeholder="Choose a template for your quotation PDF..."
              className="react-select-container"
              classNamePrefix="react-select"
              isClearable
              isSearchable
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  backgroundColor: "var(--select-bg, #ffffff)",
                  borderColor: state.isFocused
                    ? "#3B82F6"
                    : "var(--select-border, #D1D5DB)",
                  color: "var(--select-text, #111827)",
                  "&:hover": {
                    borderColor: "#3B82F6",
                  },
                  boxShadow: state.isFocused ? "0 0 0 1px #3B82F6" : "none",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--select-menu-bg, #ffffff)",
                  border: "1px solid var(--select-border, #D1D5DB)",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isSelected
                    ? "#3B82F6"
                    : state.isFocused
                      ? "var(--select-option-hover, #F3F4F6)"
                      : "transparent",
                  color: state.isSelected
                    ? "#ffffff"
                    : "var(--select-text, #111827)",
                  "&:hover": {
                    backgroundColor: state.isSelected
                      ? "#3B82F6"
                      : "var(--select-option-hover, #F3F4F6)",
                  },
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "var(--select-text, #111827)",
                }),
                placeholder: (provided) => ({
                  ...provided,
                  color: "var(--select-placeholder, #6B7280)",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "var(--select-text, #111827)",
                }),
                indicatorSeparator: (provided) => ({
                  ...provided,
                  backgroundColor: "var(--select-border, #D1D5DB)",
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: "var(--select-placeholder, #6B7280)",
                  "&:hover": {
                    color: "var(--select-text, #111827)",
                  },
                }),
                clearIndicator: (provided) => ({
                  ...provided,
                  color: "var(--select-placeholder, #6B7280)",
                  "&:hover": {
                    color: "var(--select-text, #111827)",
                  },
                }),
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#3B82F6",
                  primary75: "#60A5FA",
                  primary50: "#93C5FD",
                  primary25: "#DBEAFE",
                },
              })}
            />
            {errors.template_selection && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.template_selection.message}
              </p>
            )}
            {!selectedTemplate && (
              <p className="mt-1 text-sm text-yellow-600 dark:text-yellow-400">
                Please select a PDF template to generate the quotation
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.print()}
            className="flex items-center gap-2"
          >
            <PrinterIcon className="h-4 w-4" />
            Print Preview
          </Button>
        </div>
      </Card>
    </div>
  );
}
