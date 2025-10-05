// Import Dependencies
import { useEffect } from "react";

// Local Imports
import { Card, Input, Select, Textarea } from "components/ui";

// ----------------------------------------------------------------------

const paymentTermsOptions = [
  { value: "full_advance", label: "Full Payment in Advance" },
  { value: "50_50", label: "50% Advance, 50% Before Travel" },
  { value: "30_70", label: "30% Advance, 70% Before Travel" },
  { value: "installments", label: "Monthly Installments" },
  { value: "on_confirmation", label: "Payment on Confirmation" },
];

// ----------------------------------------------------------------------

export function CostPricingStep({ register, errors, watch, setValue }) {
  // Watch values for auto-calculations
  const basePackagePrice = watch("base_package_price") || 0;
  const taxesServicesCharges = watch("taxes_services_charges") || 0;
  const adults = watch("adults") || 1; // Get from travel details step
  const children = watch("children") || 0; // Get from travel details step

  // Auto-calculate total package price
  useEffect(() => {
    if (basePackagePrice && taxesServicesCharges >= 0) {
      const taxAmount = (basePackagePrice * taxesServicesCharges) / 100;
      const totalPrice = basePackagePrice + taxAmount;
      setValue("total_package_price", totalPrice);
    }
  }, [basePackagePrice, taxesServicesCharges, setValue]);

  // Auto-calculate per person price
  const totalPackagePriceValue = watch("total_package_price") || 0;

  useEffect(() => {
    const totalTravelers = adults + children;

    if (totalPackagePriceValue && totalTravelers > 0) {
      const perPersonPrice = totalPackagePriceValue / totalTravelers;
      setValue("per_person_price", perPersonPrice);
    }
  }, [totalPackagePriceValue, adults, children, setValue]);

  // Get calculated values for display
  const totalPackagePrice = watch("total_package_price") || 0;
  const perPersonPrice = watch("per_person_price") || 0;
  const totalTravelers = adults + children;
  const taxAmount = (basePackagePrice * taxesServicesCharges) / 100;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Step 3: Cost & Pricing
        </h3>

        {/* Package Pricing */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-medium text-gray-800 dark:text-gray-200">
            Package Pricing
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Base Package Price *"
              type="number"
              min="0"
              step="100"
              placeholder="Enter base package cost"
              {...register("base_package_price", { valueAsNumber: true })}
              error={errors.base_package_price?.message}
            />
            <Input
              label="Taxes & Service Charges (%) *"
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="Enter tax percentage"
              {...register("taxes_services_charges", { valueAsNumber: true })}
              error={errors.taxes_services_charges?.message}
            />
          </div>
        </div>

        {/* Auto-calculated Fields */}
        <div className="mb-6">
          <h4 className="text-md mb-3 font-medium text-gray-800 dark:text-gray-200">
            Calculated Pricing
          </h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Package Price
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-lg font-semibold text-green-600 dark:border-gray-600 dark:bg-gray-800">
                ₹{totalPackagePrice.toLocaleString()}
              </div>
              <input
                type="hidden"
                {...register("total_package_price", { valueAsNumber: true })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Per Person Price
              </label>
              <div className="rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-lg font-semibold text-blue-600 dark:border-gray-600 dark:bg-gray-800">
                ₹{perPersonPrice.toLocaleString()}
              </div>
              <input
                type="hidden"
                {...register("per_person_price", { valueAsNumber: true })}
              />
            </div>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="mb-6">
          <Select
            label="Payment Terms *"
            data={paymentTermsOptions}
            {...register("payment_terms")}
            error={errors.payment_terms?.message}
          />
        </div>

        {/* Pricing Notes */}
        <div>
          <Textarea
            label="Pricing Notes"
            placeholder="Additional pricing information, discounts, seasonal rates, etc."
            rows={3}
            {...register("pricing_notes")}
            error={errors.pricing_notes?.message}
          />
        </div>
      </Card>

      {/* Price Breakdown Summary */}
      <Card className="p-6">
        <h4 className="text-md mb-4 font-semibold text-gray-900 dark:text-white">
          Price Breakdown Summary
        </h4>
        <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Base Package Price:
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                ₹{basePackagePrice.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">
                Taxes & Service Charges ({taxesServicesCharges}%):
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                ₹{taxAmount.toLocaleString()}
              </span>
            </div>

            <hr className="border-gray-300 dark:border-gray-600" />

            <div className="flex items-center justify-between text-lg font-bold">
              <span className="text-gray-900 dark:text-white">
                Total Package Price:
              </span>
              <span className="text-green-600 dark:text-green-400">
                ₹{totalPackagePrice.toLocaleString()}
              </span>
            </div>

            <div className="text-md flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Price per person ({totalTravelers} travelers):
              </span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                ₹{perPersonPrice.toLocaleString()}
              </span>
            </div>

            {watch("payment_terms") && (
              <div className="mt-3 border-t border-gray-300 pt-3 dark:border-gray-600">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Payment Terms:</span>
                  <span className="ml-2">
                    {
                      paymentTermsOptions.find(
                        (opt) => opt.value === watch("payment_terms"),
                      )?.label
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
