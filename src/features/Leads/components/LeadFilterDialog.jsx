// Import Dependencies
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon, FunnelIcon } from "@heroicons/react/24/outline";
import AsyncSelect from "react-select/async";

// Local Imports
import { Button, Select } from "components/ui";

// ----------------------------------------------------------------------

const leadSourceOptions = [
  { value: "", label: "All Lead Sources" },
  { value: "website", label: "Website" },
  { value: "referral", label: "Referral" },
  { value: "social_media", label: "Social Media" },
  { value: "google_ads", label: "Google Ads" },
  { value: "travel_agent", label: "Travel Agent" },
  { value: "walk_in", label: "Walk In" },
  { value: "phone_inquiry", label: "Phone Inquiry" },
  { value: "email_inquiry", label: "Email Inquiry" },
  { value: "other", label: "Other" },
];

const agentOptions = [
  { value: "", label: "All Agents" },
  { value: "sarah_wilson", label: "Sarah Wilson" },
  { value: "mike_chen", label: "Mike Chen" },
  { value: "jessica_brown", label: "Jessica Brown" },
  { value: "admin", label: "Admin" },
];

// Mock destinations - in real app, this would come from API
const destinationOptions = [
  { value: "paris_france", label: "Paris, France" },
  { value: "tokyo_japan", label: "Tokyo, Japan" },
  { value: "london_uk", label: "London, UK" },
  { value: "rome_italy", label: "Rome, Italy" },
  { value: "barcelona_spain", label: "Barcelona, Spain" },
  { value: "new_york_usa", label: "New York, USA" },
  { value: "sydney_australia", label: "Sydney, Australia" },
  { value: "dubai_uae", label: "Dubai, UAE" },
  { value: "bangkok_thailand", label: "Bangkok, Thailand" },
  { value: "singapore", label: "Singapore" },
  { value: "mumbai_india", label: "Mumbai, India" },
  { value: "delhi_india", label: "Delhi, India" },
  { value: "maldives", label: "Maldives" },
  { value: "bali_indonesia", label: "Bali, Indonesia" },
  { value: "goa_india", label: "Goa, India" },
];

// Async function to load destination options
const loadDestinationOptions = (inputValue) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filteredOptions = destinationOptions.filter((destination) =>
        destination.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
      console.log(filteredOptions);
      resolve(filteredOptions);
    }, 300); // Simulate API delay
  });
};

// ----------------------------------------------------------------------

export function LeadFilterDialog({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDestinationChange = (selectedOption) => {
    setLocalFilters((prev) => ({
      ...prev,
      destination: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      lead_source: "",
      agent_assigned: "",
      destination: "",
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    onClose();
  };

  // Get the selected destination option for react-select
  const selectedDestination = destinationOptions.find(
    (option) => option.value === localFilters.destination,
  );

  // Custom styles for react-select to match the theme
  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
      borderWidth: "1px",
      borderRadius: "0.5rem",
      minHeight: "42px",
      boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#3b82f6",
      },
      // Dark mode styles
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#374151",
        borderColor: state.isFocused ? "#60a5fa" : "#6b7280",
        "&:hover": {
          borderColor: "#60a5fa",
        },
      },
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: "2px 12px",
    }),

    input: (provided) => ({
      ...provided,
      color: "#111827",
      fontSize: "14px",
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        color: "#f9fafb",
      },
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "14px",
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#111827",
      fontSize: "14px",
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        color: "#f9fafb",
      },
    }),

    menu: (provided) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "0.75rem",
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
      zIndex: 50,
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#1f2937",
        borderColor: "#4b5563",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      },
    }),

    menuList: (provided) => ({
      ...provided,
      padding: "8px",
      maxHeight: "240px",
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#3b82f6"
        : state.isFocused
          ? "#eff6ff"
          : "transparent",
      color: state.isSelected
        ? "white"
        : state.isFocused
          ? "#1e40af"
          : "#374151",
      borderRadius: "0.5rem",
      margin: "2px 0",
      padding: "10px 12px",
      fontSize: "14px",
      fontWeight: state.isSelected ? "500" : "400",
      cursor: "pointer",
      transition: "all 0.15s ease-in-out",
      "&:hover": {
        backgroundColor: state.isSelected ? "#2563eb" : "#dbeafe",
        color: state.isSelected ? "white" : "#1e40af",
      },
      "&:active": {
        backgroundColor: state.isSelected ? "#1d4ed8" : "#bfdbfe",
      },
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: state.isSelected
          ? "#3b82f6"
          : state.isFocused
            ? "#374151"
            : "transparent",
        color: state.isSelected
          ? "white"
          : state.isFocused
            ? "#f3f4f6"
            : "#d1d5db",
        "&:hover": {
          backgroundColor: state.isSelected ? "#2563eb" : "#4b5563",
          color: state.isSelected ? "white" : "#f9fafb",
        },
      },
    }),

    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: "#d1d5db",
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        backgroundColor: "#6b7280",
      },
    }),

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "#3b82f6" : "#9ca3af",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        color: "#3b82f6",
      },
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        color: state.isFocused ? "#60a5fa" : "#9ca3af",
        "&:hover": {
          color: "#60a5fa",
        },
      },
    }),

    clearIndicator: (provided) => ({
      ...provided,
      color: "#9ca3af",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        color: "#ef4444",
      },
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        color: "#9ca3af",
        "&:hover": {
          color: "#f87171",
        },
      },
    }),

    loadingIndicator: (provided) => ({
      ...provided,
      color: "#3b82f6",
    }),

    noOptionsMessage: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "14px",
      padding: "12px",
      fontStyle: "italic",
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        color: "#9ca3af",
      },
    }),

    loadingMessage: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "14px",
      padding: "12px",
      // Dark mode
      "@media (prefers-color-scheme: dark)": {
        color: "#9ca3af",
      },
    }),
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="dark:bg-dark-800 mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <FunnelIcon className="h-5 w-5" />
              Filter Leads
            </DialogTitle>
            <Button variant="soft" color="neutral" isIcon onClick={onClose}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Filter by Lead Source */}
            <div>
              <Select
                label="Filter by Lead Source"
                value={localFilters.lead_source}
                onChange={(e) =>
                  handleFilterChange("lead_source", e.target.value)
                }
                data={leadSourceOptions}
              />
            </div>

            {/* Filter by Agent Assigned */}
            <div>
              <Select
                label="Filter by Agent Assigned"
                value={localFilters.agent_assigned}
                onChange={(e) =>
                  handleFilterChange("agent_assigned", e.target.value)
                }
                data={agentOptions}
              />
            </div>

            {/* Filter by Travel Destination */}
            <div>
              <label className="dark:text-dark-200 mb-2 block text-sm font-medium text-gray-700">
                Filter by Travel Destination
              </label>

              <AsyncSelect
                cacheOptions
                loadOptions={loadDestinationOptions}
                defaultOptions={destinationOptions.slice(0, 5)} // Show first 5 as default
                value={selectedDestination}
                onChange={handleDestinationChange}
                placeholder="Search and select destination..."
                isClearable
                styles={customSelectStyles}
                noOptionsMessage={({ inputValue }) =>
                  inputValue
                    ? `No destinations found for "${inputValue}"`
                    : "Type to search destinations"
                }
                loadingMessage={() => "Searching destinations..."}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="dark:border-dark-600 mt-8 flex gap-3 border-t border-gray-200 pt-6">
            <Button
              variant="outlined"
              color="neutral"
              className="flex-1"
              onClick={handleClearFilters}
            >
              Clear All
            </Button>
            <Button
              color="primary"
              className="flex-1"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
