// Import Dependencies
import { useEffect } from "react";
import AsyncSelect from "react-select/async";

// Local Imports
import { Card, Input, Select, Textarea } from "components/ui";
import { useQuotationStore } from "../../store/useQuotationStore";

// ----------------------------------------------------------------------

const travelTypeOptions = [
  { value: "leisure", label: "Leisure/Vacation" },
  { value: "business", label: "Business Travel" },
  { value: "adventure", label: "Adventure/Activity" },
  { value: "family", label: "Family Trip" },
  { value: "honeymoon", label: "Honeymoon/Romance" },
  { value: "group", label: "Group Travel" },
];

const accommodationTypeOptions = [
  { value: "hotel", label: "Hotel" },
  { value: "resort", label: "Resort" },
  { value: "hostel", label: "Hostel" },
  { value: "apartment", label: "Apartment/Airbnb" },
  { value: "guesthouse", label: "Guesthouse" },
  { value: "villa", label: "Villa" },
];

const roomTypeOptions = [
  { value: "standard", label: "Standard Room" },
  { value: "deluxe", label: "Deluxe Room" },
  { value: "suite", label: "Suite" },
  { value: "family", label: "Family Room" },
  { value: "presidential", label: "Presidential Suite" },
];

const mealPlanOptions = [
  { value: "room_only", label: "Room Only" },
  { value: "breakfast", label: "Breakfast Included" },
  { value: "half_board", label: "Half Board (Breakfast + Dinner)" },
  { value: "full_board", label: "Full Board (All Meals)" },
  { value: "all_inclusive", label: "All Inclusive" },
];

const transportPreferenceOptions = [
  { value: "flight", label: "Flight" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "car", label: "Private Car" },
  { value: "mixed", label: "Mixed Transport" },
];

const budgetRangeOptions = [
  { value: "budget", label: "Budget ($500 - $1,000)" },
  { value: "mid_range", label: "Mid-range ($1,000 - $3,000)" },
  { value: "luxury", label: "Luxury ($3,000 - $10,000)" },
  { value: "ultra_luxury", label: "Ultra Luxury ($10,000+)" },
  { value: "custom", label: "Custom Budget" },
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
      resolve(filteredOptions);
    }, 300);
  });
};

// Custom styles for react-select
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: state.isFocused ? "#3b82f6" : "#d1d5db",
    borderRadius: "0.5rem",
    minHeight: "42px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(59, 130, 246, 0.1)" : "none",
    "&:hover": {
      borderColor: "#3b82f6",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white",
    borderRadius: "0.75rem",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    zIndex: 50,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#3b82f6"
      : state.isFocused
        ? "#eff6ff"
        : "transparent",
    color: state.isSelected ? "white" : "#374151",
    borderRadius: "0.5rem",
    margin: "2px 4px",
    padding: "10px 12px",
    "&:hover": {
      backgroundColor: state.isSelected ? "#2563eb" : "#dbeafe",
    },
  }),
};

// ----------------------------------------------------------------------

export function TravelRequirementsStep() {
  const { travelRequirements, setTravelRequirements } = useQuotationStore();

  const handleInputChange = (field, value) => {
    setTravelRequirements({ [field]: value });
  };

  const handleDestinationChange = (selectedOption) => {
    handleInputChange(
      "destination",
      selectedOption ? selectedOption.value : "",
    );
  };

  // Calculate duration when start and end dates change
  useEffect(() => {
    if (travelRequirements.startDate && travelRequirements.endDate) {
      const start = new Date(travelRequirements.startDate);
      const end = new Date(travelRequirements.endDate);
      const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      if (duration > 0) {
        setTravelRequirements({ duration });
      }
    }
  }, [
    travelRequirements.startDate,
    travelRequirements.endDate,
    setTravelRequirements,
  ]);

  // Update total travelers when individual counts change
  useEffect(() => {
    const total =
      travelRequirements.adults +
      travelRequirements.children +
      travelRequirements.infants;
    setTravelRequirements({ numberOfTravelers: total });
  }, [
    travelRequirements.adults,
    travelRequirements.children,
    travelRequirements.infants,
    setTravelRequirements,
  ]);

  // Get selected destination for react-select
  const selectedDestination = destinationOptions.find(
    (option) => option.value === travelRequirements.destination,
  );

  return (
    <div className="space-y-6">
      {/* Destination & Dates */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Destination & Travel Dates
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Destination *
            </label>
            <AsyncSelect
              cacheOptions
              loadOptions={loadDestinationOptions}
              defaultOptions={destinationOptions.slice(0, 8)}
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
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Start Date *"
              type="date"
              value={travelRequirements.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              required
            />
            <Input
              label="End Date *"
              type="date"
              value={travelRequirements.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Duration
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800">
                {travelRequirements.duration > 0
                  ? `${travelRequirements.duration} days`
                  : "Select dates"}
              </div>
            </div>
            <Select
              label="Travel Type *"
              value={travelRequirements.travelType}
              onChange={(e) => handleInputChange("travelType", e.target.value)}
              data={travelTypeOptions}
              required
            />
          </div>
        </div>
      </Card>

      {/* Travelers Information */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Travelers Information
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Input
            label="Adults (12+ years) *"
            type="number"
            min="1"
            value={travelRequirements.adults}
            onChange={(e) =>
              handleInputChange("adults", parseInt(e.target.value) || 1)
            }
            required
          />
          <Input
            label="Children (2-11 years)"
            type="number"
            min="0"
            value={travelRequirements.children}
            onChange={(e) =>
              handleInputChange("children", parseInt(e.target.value) || 0)
            }
          />
          <Input
            label="Infants (0-2 years)"
            type="number"
            min="0"
            value={travelRequirements.infants}
            onChange={(e) =>
              handleInputChange("infants", parseInt(e.target.value) || 0)
            }
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Travelers
            </label>
            <div className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800">
              {travelRequirements.numberOfTravelers} travelers
            </div>
          </div>
        </div>
      </Card>

      {/* Accommodation Preferences */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Accommodation Preferences
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select
            label="Accommodation Type"
            value={travelRequirements.accommodationType}
            onChange={(e) =>
              handleInputChange("accommodationType", e.target.value)
            }
            data={accommodationTypeOptions}
          />
          <Select
            label="Room Type"
            value={travelRequirements.roomType}
            onChange={(e) => handleInputChange("roomType", e.target.value)}
            data={roomTypeOptions}
          />
          <Select
            label="Meal Plan"
            value={travelRequirements.mealPlan}
            onChange={(e) => handleInputChange("mealPlan", e.target.value)}
            data={mealPlanOptions}
          />
        </div>
      </Card>

      {/* Transportation & Budget */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Transportation & Budget
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Select
            label="Transport Preference"
            value={travelRequirements.transportPreference}
            onChange={(e) =>
              handleInputChange("transportPreference", e.target.value)
            }
            data={transportPreferenceOptions}
          />
          <Select
            label="Budget Range"
            value={travelRequirements.budgetRange}
            onChange={(e) => handleInputChange("budgetRange", e.target.value)}
            data={budgetRangeOptions}
          />
        </div>
      </Card>

      {/* Special Requirements */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Special Requirements
        </h3>
        <Textarea
          label="Special Requirements & Notes"
          value={travelRequirements.specialRequirements}
          onChange={(e) =>
            handleInputChange("specialRequirements", e.target.value)
          }
          placeholder="Any special dietary requirements, accessibility needs, celebrations, preferences, etc."
          rows={4}
        />
      </Card>

      {/* Summary */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Travel Summary
        </h3>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Destination:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {selectedDestination?.label || "Not selected"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Duration:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {travelRequirements.duration > 0
                  ? `${travelRequirements.duration} days`
                  : "Not set"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Travelers:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {travelRequirements.numberOfTravelers} people
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Travel Type:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {
                  travelTypeOptions.find(
                    (opt) => opt.value === travelRequirements.travelType,
                  )?.label
                }
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
