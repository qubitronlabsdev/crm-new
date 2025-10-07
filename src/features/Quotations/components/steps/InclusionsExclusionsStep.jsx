// Import Dependencies
import { useState, useEffect } from "react";
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Card, Input, Textarea, Button } from "components/ui";

// ----------------------------------------------------------------------

// const defaultInclusions = [
//   "Accommodation as per itinerary",
//   "Daily breakfast",
//   "Airport transfers",
//   "Sightseeing as mentioned in itinerary",
//   "Professional tour guide",
// ];

// const defaultExclusions = [
//   "Personal expenses",
//   "Meals not mentioned in the itinerary",
//   "Travel insurance",
//   "Visa fees",
//   "Tips and gratuities",
//   "Any item not mentioned in inclusions",
// ];

// ----------------------------------------------------------------------

export function InclusionsExclusionsStep({
  register,
  errors,
  watch,
  setValue,
  defaultData = {},
}) {
  const [inclusions, setInclusions] = useState([{ id: 1, text: "" }]);
  const [exclusions, setExclusions] = useState([{ id: 1, text: "" }]);

  useEffect(() => {
    if (defaultData && Object.keys(defaultData).length > 0) {
      // Set form values from defaultData when provided
      Object.keys(defaultData).forEach((key) => {
        if (
          defaultData[key] !== undefined &&
          key !== "inclusions" &&
          key !== "exclusions"
        ) {
          setValue(key, defaultData[key], { shouldValidate: false });
        }
      });

      // Set inclusions and exclusions if available
      if (defaultData.inclusions && Array.isArray(defaultData.inclusions)) {
        const inclusionsWithIds =
          defaultData.inclusions.length > 0
            ? defaultData.inclusions.map((item, index) => ({
                id: index + 1,
                text: typeof item === "string" ? item : item.text || "",
              }))
            : [{ id: 1, text: "" }];
        setInclusions(inclusionsWithIds);
        setValue("inclusions", defaultData.inclusions, {
          shouldValidate: false,
        });
      }

      if (defaultData.exclusions && Array.isArray(defaultData.exclusions)) {
        const exclusionsWithIds =
          defaultData.exclusions.length > 0
            ? defaultData.exclusions.map((item, index) => ({
                id: index + 1,
                text: typeof item === "string" ? item : item.text || "",
              }))
            : [{ id: 1, text: "" }];
        setExclusions(exclusionsWithIds);
        setValue("exclusions", defaultData.exclusions, {
          shouldValidate: false,
        });
      }
    }
  }, [defaultData, setValue]);

  // Inclusions handlers
  const addInclusion = () => {
    const newId =
      inclusions.length > 0 ? Math.max(...inclusions.map((i) => i.id)) + 1 : 1;
    const newInclusions = [...inclusions, { id: newId, text: "" }];
    setInclusions(newInclusions);
    setValue(
      "inclusions",
      newInclusions
        .map((item) => item.text || "")
        .filter((text) => text.trim()),
    );
  };

  const removeInclusion = (id) => {
    if (inclusions.length > 1) {
      const newInclusions = inclusions.filter((i) => i.id !== id);
      setInclusions(newInclusions);
      setValue(
        "inclusions",
        newInclusions
          .map((item) => item.text || "")
          .filter((text) => text.trim()),
      );
    }
  };

  const updateInclusion = (id, text) => {
    const newInclusions = inclusions.map((item) =>
      item.id === id ? { ...item, text } : item,
    );
    setInclusions(newInclusions);
    setValue(
      "inclusions",
      newInclusions
        .map((item) => item.text || "")
        .filter((text) => text.trim()),
    );
  };

  // Exclusions handlers
  const addExclusion = () => {
    const newId =
      exclusions.length > 0 ? Math.max(...exclusions.map((e) => e.id)) + 1 : 1;
    const newExclusions = [...exclusions, { id: newId, text: "" }];
    setExclusions(newExclusions);
    setValue(
      "exclusions",
      newExclusions
        .map((item) => item.text || "")
        .filter((text) => text.trim()),
    );
  };

  const removeExclusion = (id) => {
    if (exclusions.length > 1) {
      const newExclusions = exclusions.filter((e) => e.id !== id);
      setExclusions(newExclusions);
      setValue(
        "exclusions",
        newExclusions
          .map((item) => item.text || "")
          .filter((text) => text.trim()),
      );
    }
  };

  const updateExclusion = (id, text) => {
    const newExclusions = exclusions.map((item) =>
      item.id === id ? { ...item, text } : item,
    );
    setExclusions(newExclusions);
    setValue(
      "exclusions",
      newExclusions
        .map((item) => item.text || "")
        .filter((text) => text.trim()),
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Step 3: Inclusions & Exclusions
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Inclusions */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                Package Inclusions *
              </h4>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addInclusion}
              >
                Add Inclusion
              </Button>
            </div>

            <div className="space-y-3">
              {inclusions.map((inclusion) => (
                <div key={inclusion.id} className="flex items-start gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="What's included in this package..."
                      value={inclusion.text}
                      onChange={(e) =>
                        updateInclusion(inclusion.id, e.target.value)
                      }
                    />
                  </div>
                  {inclusions.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      color="error"
                      onClick={() => removeInclusion(inclusion.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {errors.inclusions && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.inclusions.message}
              </p>
            )}
          </div>

          {/* Exclusions */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">
                Package Exclusions *
              </h4>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={addExclusion}
              >
                Add Exclusion
              </Button>
            </div>

            <div className="space-y-3">
              {exclusions.map((exclusion) => (
                <div key={exclusion.id} className="flex items-start gap-3">
                  <div className="flex-1">
                    <Input
                      placeholder="What's not included in this package..."
                      value={exclusion.text}
                      onChange={(e) =>
                        updateExclusion(exclusion.id, e.target.value)
                      }
                    />
                  </div>
                  {exclusions.length > 1 && (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      color="error"
                      onClick={() => removeExclusion(exclusion.id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {errors.exclusions && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.exclusions.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Cancellation Policy */}
          <div className="mb-6">
            <Textarea
              label="Cancellation Policy *"
              placeholder="Enter cancellation terms and conditions..."
              rows={4}
              {...register("cancellation_policy")}
              error={errors.cancellation_policy?.message}
            />
          </div>

          {/* Terms & Conditions */}
          <div>
            <Textarea
              label="Terms & Conditions *"
              placeholder="Enter general terms and conditions..."
              rows={4}
              {...register("terms_conditions")}
              error={errors.terms_conditions?.message}
            />
          </div>
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6">
        <h4 className="text-md mb-4 font-semibold text-gray-900 dark:text-white">
          Package Details Summary
        </h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Inclusions Summary */}
          <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
            <h5 className="mb-2 flex items-center gap-2 font-medium text-green-800 dark:text-green-300">
              <CheckCircleIcon className="h-4 w-4" />
              Package Inclusions (
              {
                inclusions.filter((i) => i && i.text && i.text.trim()).length
              }{" "}
              items)
            </h5>
            <ul className="space-y-1 text-sm text-green-700 dark:text-green-200">
              {inclusions
                .filter((item) => item && item.text && item.text.trim())
                .map((item) => (
                  <li key={item.id} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item.text}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Exclusions Summary */}
          <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
            <h5 className="mb-2 flex items-center gap-2 font-medium text-red-800 dark:text-red-300">
              <XCircleIcon className="h-4 w-4" />
              Package Exclusions (
              {
                exclusions.filter((e) => e && e.text && e.text.trim()).length
              }{" "}
              items)
            </h5>
            <ul className="space-y-1 text-sm text-red-700 dark:text-red-200">
              {exclusions
                .filter((item) => item && item.text && item.text.trim())
                .map((item) => (
                  <li key={item.id} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{item.text}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Policy Summary */}
        <div className="mt-6 space-y-4">
          <div className="rounded-lg bg-yellow-50 p-4 dark:bg-yellow-900/20">
            <h5 className="mb-2 flex items-center gap-2 font-medium text-yellow-800 dark:text-yellow-300">
              <ClipboardDocumentListIcon className="h-4 w-4" />
              Cancellation Policy
            </h5>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              {watch("cancellation_policy") || "Not specified"}
            </p>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h5 className="mb-2 flex items-center gap-2 font-medium text-blue-800 dark:text-blue-300">
              <ClipboardDocumentListIcon className="h-4 w-4" />
              Terms & Conditions
            </h5>
            <p className="text-sm text-blue-700 dark:text-blue-200">
              {watch("terms_conditions") || "Not specified"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
