// Import Dependencies
import { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon, ArrowsUpDownIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";

// ----------------------------------------------------------------------

const sortOptions = [
  {
    value: "created_at",
    label: "Created At Date",
    description: "Sort by when the lead was created",
  },
  {
    value: "updated_at",
    label: "Updated At Date",
    description: "Sort by when the lead was last modified",
  },
  {
    value: "priority",
    label: "Lead Priority",
    description: "Sort by lead priority (Urgent, High, Medium, Low)",
  },
  {
    value: "travel_date",
    label: "Travel Date",
    description: "Sort by the planned travel date",
  },
];

const orderOptions = [
  { value: "asc", label: "Ascending (Oldest first / Low to High)" },
  { value: "desc", label: "Descending (Newest first / High to Low)" },
];

// ----------------------------------------------------------------------

export function LeadSortDialog({ isOpen, onClose, sort, onSortChange }) {
  const [localSort, setLocalSort] = useState(sort);

  const handleSortChange = (key, value) => {
    setLocalSort((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplySort = () => {
    onSortChange(localSort);
    onClose();
  };

  const handleClearSort = () => {
    const defaultSort = {
      field: "created_at",
      order: "desc",
    };
    setLocalSort(defaultSort);
    onSortChange(defaultSort);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/25" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="dark:bg-dark-800 mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
          <div className="mb-6 flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <ArrowsUpDownIcon className="h-5 w-5" />
              Sort Leads
            </DialogTitle>
            <Button variant="soft" color="neutral" isIcon onClick={onClose}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Sort Field */}
            <div>
              <label className="dark:text-dark-200 mb-3 block text-sm font-medium text-gray-700">
                Sort By
              </label>
              <div className="space-y-2">
                {sortOptions.map((option) => (
                  <label
                    key={option.value}
                    className="dark:border-dark-600 dark:hover:bg-dark-700 flex cursor-pointer items-start gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="sort_field"
                      value={option.value}
                      checked={localSort.field === option.value}
                      onChange={(e) =>
                        handleSortChange("field", e.target.value)
                      }
                      className="text-primary-600 focus:ring-primary-500 dark:border-dark-500 mt-1 h-4 w-4 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {option.label}
                      </div>
                      <div className="dark:text-dark-300 text-sm text-gray-500">
                        {option.description}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label className="dark:text-dark-200 mb-3 block text-sm font-medium text-gray-700">
                Sort Order
              </label>
              <div className="space-y-2">
                {orderOptions.map((option) => (
                  <label
                    key={option.value}
                    className="dark:border-dark-600 dark:hover:bg-dark-700 flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      name="sort_order"
                      value={option.value}
                      checked={localSort.order === option.value}
                      onChange={(e) =>
                        handleSortChange("order", e.target.value)
                      }
                      className="text-primary-600 focus:ring-primary-500 dark:border-dark-500 h-4 w-4 border-gray-300"
                    />
                    <div className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="dark:border-dark-600 mt-8 flex gap-3 border-t border-gray-200 pt-6">
            <Button
              variant="outlined"
              color="neutral"
              className="flex-1"
              onClick={handleClearSort}
            >
              Reset to Default
            </Button>
            <Button
              color="primary"
              className="flex-1"
              onClick={handleApplySort}
            >
              Apply Sort
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
