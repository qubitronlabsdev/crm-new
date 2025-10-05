// Import Dependencies
import { useState } from "react";

// Local Imports
import { Card, Input, Select, Button } from "components/ui";

// ----------------------------------------------------------------------

const hotelRatingOptions = [
  { value: "1", label: "1 Star" },
  { value: "2", label: "2 Star" },
  { value: "3", label: "3 Star" },
  { value: "4", label: "4 Star" },
  { value: "5", label: "5 Star" },
];

const roomTypeOptions = [
  { value: "standard", label: "Standard Room" },
  { value: "deluxe", label: "Deluxe Room" },
  { value: "suite", label: "Suite" },
  { value: "premium", label: "Premium Room" },
];

const mealPlanOptions = [
  { value: "ep", label: "EP (European Plan - Room Only)" },
  { value: "cp", label: "CP (Continental Plan - Room + Breakfast)" },
  {
    value: "map",
    label: "MAP (Modified American Plan - Room + Breakfast + Dinner)",
  },
  { value: "ap", label: "AP (American Plan - Room + All Meals)" },
];

const transportationModeOptions = [
  { value: "train", label: "Train" },
  { value: "flight", label: "Flight" },
  { value: "car", label: "Car" },
  { value: "bus", label: "Bus" },
];

// ----------------------------------------------------------------------

export function HotelsTransportationStep({
  register,
  errors,
  watch,
  setValue,
}) {
  const [transportationCharges, setTransportationCharges] = useState([
    { id: 1, description: "", amount: 0 },
  ]);

  // Watch values for summary
  const hotelRating = watch("hotel_rating");
  const roomType = watch("room_type");
  const mealPlan = watch("meal_plan");
  const transportationMode = watch("transportation_mode");

  // Transportation charges handlers
  const addTransportationCharge = () => {
    const newId = Math.max(...transportationCharges.map((c) => c.id)) + 1;
    setTransportationCharges([
      ...transportationCharges,
      { id: newId, description: "", amount: 0 },
    ]);
  };

  const removeTransportationCharge = (id) => {
    if (transportationCharges.length > 1) {
      setTransportationCharges(
        transportationCharges.filter((c) => c.id !== id),
      );
    }
  };

  const updateTransportationCharge = (id, field, value) => {
    setTransportationCharges(
      transportationCharges.map((charge) =>
        charge.id === id
          ? {
              ...charge,
              [field]: field === "amount" ? parseFloat(value) || 0 : value,
            }
          : charge,
      ),
    );

    // Update form value
    setValue("transportation_charges", transportationCharges);
  };

  // Calculate total transportation cost
  const totalTransportationCost = transportationCharges.reduce(
    (total, charge) => total + (charge.amount || 0),
    0,
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Step 2: Hotels & Transportation
        </h3>

        {/* Hotel Details */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-medium text-gray-800 dark:text-gray-200">
            Hotel Preferences
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Select
              label="Hotel Rating *"
              data={hotelRatingOptions}
              {...register("hotel_rating")}
              error={errors.hotel_rating?.message}
            />
            <Select
              label="Room Type *"
              data={roomTypeOptions}
              {...register("room_type")}
              error={errors.room_type?.message}
            />
            <Select
              label="Meal Plan *"
              data={mealPlanOptions}
              {...register("meal_plan")}
              error={errors.meal_plan?.message}
            />
          </div>
        </div>

        {/* Transportation Details */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-medium text-gray-800 dark:text-gray-200">
            Transportation
          </h4>
          <div className="mb-4">
            <Select
              label="Transportation Mode *"
              data={transportationModeOptions}
              {...register("transportation_mode")}
              error={errors.transportation_mode?.message}
            />
          </div>

          {/* Dynamic Transportation Charges */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Transportation Charges
              </label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addTransportationCharge}
              >
                Add Charge
              </Button>
            </div>

            {transportationCharges.map((charge) => (
              <div key={charge.id} className="flex items-start gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="Description (e.g., Airport transfer, Local sightseeing)"
                    value={charge.description}
                    onChange={(e) =>
                      updateTransportationCharge(
                        charge.id,
                        "description",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="w-32">
                  <Input
                    type="number"
                    placeholder="Amount"
                    min="0"
                    step="100"
                    value={charge.amount}
                    onChange={(e) =>
                      updateTransportationCharge(
                        charge.id,
                        "amount",
                        e.target.value,
                      )
                    }
                  />
                </div>
                {transportationCharges.length > 1 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    color="error"
                    onClick={() => removeTransportationCharge(charge.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}

            <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Transportation Cost: ₹
                {totalTransportationCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6">
        <h4 className="text-md mb-4 font-semibold text-gray-900 dark:text-white">
          Hotels & Transportation Summary
        </h4>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Hotel Rating:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {hotelRatingOptions.find((opt) => opt.value === hotelRating)
                  ?.label || "Not selected"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Room Type:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {roomTypeOptions.find((opt) => opt.value === roomType)?.label ||
                  "Not selected"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Meal Plan:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {mealPlanOptions.find((opt) => opt.value === mealPlan)?.label ||
                  "Not selected"}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Transportation:
              </span>
              <span className="ml-2 text-gray-900 dark:text-white">
                {transportationModeOptions.find(
                  (opt) => opt.value === transportationMode,
                )?.label || "Not selected"}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Transportation Charges:
              </span>
              <div className="mt-1 ml-2">
                {transportationCharges.map(
                  (charge) =>
                    charge.description && (
                      <div
                        key={charge.id}
                        className="text-gray-900 dark:text-white"
                      >
                        {charge.description}: ₹{charge.amount.toLocaleString()}
                      </div>
                    ),
                )}
                <div className="text-primary mt-2 font-medium">
                  Total: ₹{totalTransportationCost.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
