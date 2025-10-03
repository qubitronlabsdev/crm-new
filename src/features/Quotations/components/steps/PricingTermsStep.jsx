// Import Dependencies
import { useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Card, Input, Textarea, Button, Select } from "components/ui";
import { useQuotationStore } from "../../store/useQuotationStore";
import { useItineraryStore } from "../../store/useItineraryStore";

// ----------------------------------------------------------------------

const currencyOptions = [
  { value: "USD", label: "USD - US Dollar" },
  { value: "EUR", label: "EUR - Euro" },
  { value: "GBP", label: "GBP - British Pound" },
  { value: "INR", label: "INR - Indian Rupee" },
  { value: "AED", label: "AED - UAE Dirham" },
  { value: "CAD", label: "CAD - Canadian Dollar" },
  { value: "AUD", label: "AUD - Australian Dollar" },
];

const defaultInclusions = [
  "Accommodation as per itinerary",
  "Daily breakfast",
  "Airport transfers",
  "Sightseeing as mentioned",
  "Professional tour guide",
  "All applicable taxes",
];

const defaultExclusions = [
  "International flights",
  "Visa fees",
  "Travel insurance",
  "Personal expenses",
  "Meals not mentioned",
  "Tips and gratuities",
  "Optional activities",
];

const defaultCancellationPolicy = `
Cancellation Charges:
• 45 days before departure: 25% of total cost
• 30 days before departure: 50% of total cost  
• 15 days before departure: 75% of total cost
• Less than 15 days: 100% of total cost

Note: Cancellation charges may vary for peak seasons and special events.
`.trim();

const defaultTermsAndConditions = `
Terms & Conditions:
• Booking confirmation subject to availability
• Rates are subject to change without notice
• Check-in time: 3:00 PM, Check-out time: 12:00 PM
• Valid government ID required at all times
• The company is not responsible for any loss or damage
• Force majeure conditions apply
• Disputes subject to local jurisdiction
`.trim();

// ----------------------------------------------------------------------

export function PricingTermsStep() {
  const { pricingTerms, setPricingTerms, calculateTotalCost } =
    useQuotationStore();

  const { getTotalNetCost, getTotalWithMarkup } = useItineraryStore();

  const [newInclusion, setNewInclusion] = useState("");
  const [newExclusion, setNewExclusion] = useState("");

  // Manual function to sync with itinerary costs
  const syncWithItinerary = () => {
    const itineraryCost = getTotalNetCost();
    const itineraryTotal = getTotalWithMarkup();

    if (itineraryCost > 0) {
      setPricingTerms({
        costBreakdown: {
          ...pricingTerms.costBreakdown,
          landPackage: itineraryCost,
        },
        totalCost: itineraryTotal,
      });
    }
  };

  // Manual function to initialize defaults
  const initializeDefaults = () => {
    const updates = {};

    if (pricingTerms.inclusions.length === 0) {
      updates.inclusions = defaultInclusions;
    }
    if (pricingTerms.exclusions.length === 0) {
      updates.exclusions = defaultExclusions;
    }
    if (!pricingTerms.cancellationPolicy) {
      updates.cancellationPolicy = defaultCancellationPolicy;
    }
    if (!pricingTerms.termsAndConditions) {
      updates.termsAndConditions = defaultTermsAndConditions;
    }

    if (Object.keys(updates).length > 0) {
      setPricingTerms(updates);
    }
  };

  const handleCostChange = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setPricingTerms({
      costBreakdown: {
        ...pricingTerms.costBreakdown,
        [field]: numValue,
      },
    });

    // Recalculate total
    setTimeout(() => calculateTotalCost(), 100);
  };

  const handlePaymentTermsChange = (field, value) => {
    const updates = {
      [field]: field.includes("Payment") ? parseFloat(value) || 0 : value,
    };

    // Auto-calculate final payment percentage
    if (field === "advancePayment") {
      updates.finalPayment = 100 - (parseFloat(value) || 0);
    }

    setPricingTerms({
      paymentTerms: {
        ...pricingTerms.paymentTerms,
        ...updates,
      },
    });
  };

  const addInclusion = () => {
    if (newInclusion.trim()) {
      setPricingTerms({
        inclusions: [...pricingTerms.inclusions, newInclusion.trim()],
      });
      setNewInclusion("");
    }
  };

  const removeInclusion = (index) => {
    const updatedInclusions = pricingTerms.inclusions.filter(
      (_, i) => i !== index,
    );
    setPricingTerms({ inclusions: updatedInclusions });
  };

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setPricingTerms({
        exclusions: [...pricingTerms.exclusions, newExclusion.trim()],
      });
      setNewExclusion("");
    }
  };

  const removeExclusion = (index) => {
    const updatedExclusions = pricingTerms.exclusions.filter(
      (_, i) => i !== index,
    );
    setPricingTerms({ exclusions: updatedExclusions });
  };

  const totalCostBeforeMarkup = Object.values(pricingTerms.costBreakdown)
    .filter((_, index, arr) => index < arr.length - 1) // Exclude markup
    .reduce((sum, cost) => sum + cost, 0);

  const markupAmount =
    (totalCostBeforeMarkup * pricingTerms.costBreakdown.markup) / 100;
  const finalTotal = totalCostBeforeMarkup + markupAmount;

  return (
    <div className="space-y-6">
      {/* Cost Breakdown */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Cost Breakdown
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={syncWithItinerary}
              variant="soft"
              color="primary"
              size="sm"
            >
              Sync with Itinerary (${getTotalNetCost().toLocaleString()})
            </Button>
            <Button
              onClick={initializeDefaults}
              variant="soft"
              color="neutral"
              size="sm"
            >
              Load Defaults
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Land Package"
            type="number"
            min="0"
            step="0.01"
            value={pricingTerms.costBreakdown.landPackage}
            onChange={(e) => handleCostChange("landPackage", e.target.value)}
            prefix={pricingTerms.currency}
          />
          <Input
            label="Flights"
            type="number"
            min="0"
            step="0.01"
            value={pricingTerms.costBreakdown.flights}
            onChange={(e) => handleCostChange("flights", e.target.value)}
            prefix={pricingTerms.currency}
          />
          <Input
            label="Hotels"
            type="number"
            min="0"
            step="0.01"
            value={pricingTerms.costBreakdown.hotels}
            onChange={(e) => handleCostChange("hotels", e.target.value)}
            prefix={pricingTerms.currency}
          />
          <Input
            label="Transportation"
            type="number"
            min="0"
            step="0.01"
            value={pricingTerms.costBreakdown.transportation}
            onChange={(e) => handleCostChange("transportation", e.target.value)}
            prefix={pricingTerms.currency}
          />
          <Input
            label="Activities"
            type="number"
            min="0"
            step="0.01"
            value={pricingTerms.costBreakdown.activities}
            onChange={(e) => handleCostChange("activities", e.target.value)}
            prefix={pricingTerms.currency}
          />
          <Input
            label="Taxes & Fees"
            type="number"
            min="0"
            step="0.01"
            value={pricingTerms.costBreakdown.taxes}
            onChange={(e) => handleCostChange("taxes", e.target.value)}
            prefix={pricingTerms.currency}
          />
          <Input
            label="Markup (%)"
            type="number"
            min="0"
            max="100"
            value={pricingTerms.costBreakdown.markup}
            onChange={(e) => handleCostChange("markup", e.target.value)}
            suffix="%"
          />
          <Select
            label="Currency"
            value={pricingTerms.currency}
            onChange={(e) => setPricingTerms({ currency: e.target.value })}
            data={currencyOptions}
          />
        </div>

        {/* Total Summary */}
        <div className="mt-6 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <h4 className="mb-3 font-medium text-gray-900 dark:text-white">
            Pricing Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Subtotal:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {pricingTerms.currency} {totalCostBeforeMarkup.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Markup ({pricingTerms.costBreakdown.markup}%):
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {pricingTerms.currency} {markupAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 dark:border-gray-600">
              <span className="font-semibold text-gray-900 dark:text-white">
                Total:
              </span>
              <span className="text-primary-600 dark:text-primary-400 font-semibold">
                {pricingTerms.currency} {finalTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Terms */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Payment Terms & Schedule
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Advance Payment (%)"
            type="number"
            min="0"
            max="100"
            value={pricingTerms.paymentTerms.advancePayment}
            onChange={(e) =>
              handlePaymentTermsChange("advancePayment", e.target.value)
            }
            suffix="%"
          />
          <Input
            label="Final Payment (%)"
            type="number"
            min="0"
            max="100"
            value={pricingTerms.paymentTerms.finalPayment}
            onChange={(e) =>
              handlePaymentTermsChange("finalPayment", e.target.value)
            }
            suffix="%"
            readOnly
            className="bg-gray-50 dark:bg-gray-800"
          />
          <Input
            label="Advance Due Date"
            type="date"
            value={pricingTerms.paymentTerms.advanceDueDate}
            onChange={(e) =>
              handlePaymentTermsChange("advanceDueDate", e.target.value)
            }
          />
          <Input
            label="Final Due Date"
            type="date"
            value={pricingTerms.paymentTerms.finalDueDate}
            onChange={(e) =>
              handlePaymentTermsChange("finalDueDate", e.target.value)
            }
          />
        </div>

        {/* Payment Summary */}
        <div className="mt-4 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
            <div>
              <span className="font-medium text-blue-900 dark:text-blue-200">
                Advance Amount:
              </span>
              <span className="ml-2 text-blue-800 dark:text-blue-300">
                {pricingTerms.currency}{" "}
                {(
                  (finalTotal * pricingTerms.paymentTerms.advancePayment) /
                  100
                ).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="font-medium text-blue-900 dark:text-blue-200">
                Final Amount:
              </span>
              <span className="ml-2 text-blue-800 dark:text-blue-300">
                {pricingTerms.currency}{" "}
                {(
                  (finalTotal * pricingTerms.paymentTerms.finalPayment) /
                  100
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Inclusions */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Inclusions
        </h3>
        <div className="space-y-3">
          {pricingTerms.inclusions.map((inclusion, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-gray-200 bg-green-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-green-900/20">
                {inclusion}
              </div>
              <Button
                onClick={() => removeInclusion(index)}
                variant="soft"
                color="error"
                size="sm"
                isIcon
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={newInclusion}
              onChange={(e) => setNewInclusion(e.target.value)}
              placeholder="Add new inclusion..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && addInclusion()}
            />
            <Button onClick={addInclusion} color="success" size="sm">
              <PlusIcon className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </Card>

      {/* Exclusions */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Exclusions
        </h3>
        <div className="space-y-3">
          {pricingTerms.exclusions.map((exclusion, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-gray-200 bg-red-50 px-3 py-2 text-sm dark:border-gray-600 dark:bg-red-900/20">
                {exclusion}
              </div>
              <Button
                onClick={() => removeExclusion(index)}
                variant="soft"
                color="error"
                size="sm"
                isIcon
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={newExclusion}
              onChange={(e) => setNewExclusion(e.target.value)}
              placeholder="Add new exclusion..."
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && addExclusion()}
            />
            <Button onClick={addExclusion} color="error" size="sm">
              <PlusIcon className="mr-1 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </Card>

      {/* Policies */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Cancellation Policy
          </h3>
          <Textarea
            value={pricingTerms.cancellationPolicy}
            onChange={(e) =>
              setPricingTerms({ cancellationPolicy: e.target.value })
            }
            rows={8}
            placeholder="Enter cancellation policy..."
          />
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Terms & Conditions
          </h3>
          <Textarea
            value={pricingTerms.termsAndConditions}
            onChange={(e) =>
              setPricingTerms({ termsAndConditions: e.target.value })
            }
            rows={8}
            placeholder="Enter terms and conditions..."
          />
        </Card>
      </div>
    </div>
  );
}
