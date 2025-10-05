// Import Dependencies
import { useState, useEffect, useCallback } from "react";
import { Controller } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Card, Input, Textarea } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { ItineraryBuilder } from "../ItineraryBuilder";

// ----------------------------------------------------------------------

export function TravelDetailsStep({
  control,
  register,
  errors,
  watch,
  setValue,
}) {
  const [isChildrenAgeDropdownOpen, setIsChildrenAgeDropdownOpen] =
    useState(false);
  const [childrenAges, setChildrenAges] = useState([]);

  const children = watch("children") || 0;
  const adults = watch("adults") || 0;
  const totalTravelers = adults + children;

  // Update children ages array when children count changes
  const updateChildrenAgeField = useCallback(
    (ages) => {
      const ageValues = ages
        .map((child) => child.age)
        .filter((age) => age && age.trim() !== "")
        .join(", ");
      setValue("children_age", ageValues);
    },
    [setValue],
  );

  useEffect(() => {
    const count = children;
    setChildrenAges((prevAges) => {
      const newAges = Array.from({ length: count }, (_, index) => ({
        id: index,
        age: prevAges[index]?.age || "",
      }));
      updateChildrenAgeField(newAges);
      return newAges;
    });
  }, [children, updateChildrenAgeField]);

  // Update individual child age
  const updateChildAge = (childIndex, age) => {
    const newAges = [...childrenAges];
    newAges[childIndex] = { ...newAges[childIndex], age };
    setChildrenAges(newAges);
    updateChildrenAgeField(newAges);
  };

  // Get display text for children ages
  const getChildrenAgeDisplayText = () => {
    const filledAges = childrenAges.filter(
      (child) => child.age && child.age.trim() !== "",
    );
    if (filledAges.length === 0) {
      return children > 0 ? "Select children ages..." : "No children";
    }
    return filledAges.map((child) => `${child.age} years`).join(", ");
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Step 1: Travel Details
        </h3>

        {/* Travel Dates & Duration */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-medium text-gray-800 dark:text-gray-200">
            Travel Dates & Duration
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Controller
              name="travel_date"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <DatePicker
                  label="Travel Date *"
                  placeholder="mm/dd/yyyy"
                  options={{
                    dateFormat: "m/d/Y",
                    allowInput: true,
                    onChange: (selectedDates, dateStr) => {
                      onChange(dateStr);
                    },
                  }}
                  hasCalenderIcon={true}
                  value={value}
                  error={errors.travel_date?.message}
                  {...field}
                />
              )}
            />
            <Input
              label="Travel Time *"
              type="time"
              placeholder="Select time"
              {...register("travel_time")}
              error={errors.travel_time?.message}
            />
            <Controller
              name="expected_close_date"
              control={control}
              render={({ field: { onChange, value, ...field } }) => (
                <DatePicker
                  label="Expected Close Date *"
                  placeholder="mm/dd/yyyy"
                  options={{
                    dateFormat: "m/d/Y",
                    allowInput: true,
                    onChange: (selectedDates, dateStr) => {
                      onChange(dateStr);
                    },
                  }}
                  hasCalenderIcon={true}
                  value={value}
                  error={errors.expected_close_date?.message}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Destinations */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-medium text-gray-800 dark:text-gray-200">
            Destinations
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Departure City *"
              placeholder="Enter departure city"
              {...register("departure_city")}
              error={errors.departure_city?.message}
            />
            <Input
              label="Destination *"
              placeholder="Enter destination"
              {...register("destination")}
              error={errors.destination?.message}
            />
          </div>
        </div>

        {/* Duration & Travelers */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-medium text-gray-800 dark:text-gray-200">
            Duration & Travelers
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Input
              label="Days *"
              type="number"
              min="1"
              {...register("days", { valueAsNumber: true })}
              error={errors.days?.message}
            />
            <Input
              label="Nights *"
              type="number"
              min="0"
              {...register("nights", { valueAsNumber: true })}
              error={errors.nights?.message}
            />
            <Input
              label="Adults *"
              type="number"
              min="1"
              {...register("adults", { valueAsNumber: true })}
              error={errors.adults?.message}
            />
            <Input
              label="Children *"
              type="number"
              min="0"
              {...register("children", { valueAsNumber: true })}
              error={errors.children?.message}
            />
          </div>

          {/* Children Ages Selector */}
          {children > 0 && (
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Children Ages *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setIsChildrenAgeDropdownOpen(!isChildrenAgeDropdownOpen)
                  }
                  disabled={children === 0}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 ${
                    children === 0
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:border-gray-400"
                  } flex min-h-[42px] items-center justify-between`}
                >
                  <span
                    className={`block truncate ${
                      getChildrenAgeDisplayText() === "No children" ||
                      getChildrenAgeDisplayText() === "Select children ages..."
                        ? "text-gray-500"
                        : "text-gray-900 dark:text-white"
                    }`}
                  >
                    {getChildrenAgeDisplayText()}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isChildrenAgeDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Content */}
                {isChildrenAgeDropdownOpen && children > 0 && (
                  <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
                    <div className="space-y-3 p-3">
                      {childrenAges.map((child, index) => (
                        <div
                          key={child.id}
                          className="flex items-center justify-between"
                        >
                          <label className="min-w-[80px] text-sm font-medium text-gray-700 dark:text-gray-300">
                            Child {index + 1} age:
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="17"
                            placeholder="Age"
                            value={child.age}
                            onChange={(e) =>
                              updateChildAge(index, e.target.value)
                            }
                            className="ml-2 w-20 rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      ))}

                      <div className="border-t border-gray-200 pt-2 dark:border-gray-600">
                        <button
                          type="button"
                          onClick={() => setIsChildrenAgeDropdownOpen(false)}
                          className="w-full rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Hidden input for form registration */}
              <input type="hidden" {...register("children_age")} />

              {errors.children_age && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.children_age.message}
                </p>
              )}

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                e.g. 5, 8, 12
              </p>
            </div>
          )}
        </div>

        {/* Budget & Special Requests */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Budget *"
            type="number"
            min="0"
            step="100"
            placeholder="Enter total budget"
            {...register("budget", { valueAsNumber: true })}
            error={errors.budget?.message}
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Total Travelers
            </label>
            <div className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800">
              {totalTravelers} travelers
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Textarea
            label="Special Requests"
            placeholder="Any special dietary requirements, accessibility needs, celebrations, preferences, etc."
            rows={3}
            {...register("special_requests")}
            error={errors.special_requests?.message}
          />
        </div>
      </Card>

      {/* Itinerary Builder */}
      <Card className="p-6">
        <h4 className="text-md mb-4 font-semibold text-gray-900 dark:text-white">
          Day-wise Itinerary Builder
        </h4>
        <ItineraryBuilder />
      </Card>

      {/* Summary */}
      <Card className="p-6">
        <h4 className="text-md mb-4 font-semibold text-gray-900 dark:text-white">
          Travel Details Summary
        </h4>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Destination:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {watch("destination") || "Not selected"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Duration:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {watch("days")} days, {watch("nights")} nights
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Travelers:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {totalTravelers} people (Adults: {adults}, Children: {children})
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Budget:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                ₹{watch("budget")?.toLocaleString() || "0"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Travel Date:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {watch("travel_date") || "Not set"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Expected Close:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {watch("expected_close_date") || "Not set"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
