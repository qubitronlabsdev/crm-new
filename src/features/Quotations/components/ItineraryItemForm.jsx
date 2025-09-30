// Import Dependencies
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

// Local Imports
import { Button, Input, Select, Textarea } from "components/ui";

// ----------------------------------------------------------------------

const itemTypes = [
  { value: "hotel", label: "Hotel" },
  { value: "flight", label: "Flight" },
  { value: "activity", label: "Activity" },
  { value: "transport", label: "Transport" },
  { value: "meal", label: "Meal" },
  { value: "other", label: "Other" },
];

const itemSchema = yup.object({
  type: yup.string().required("Item type is required"),
  title: yup.string().required("Title is required"),
  description: yup.string(),
  cost: yup
    .number()
    .min(0, "Cost must be positive")
    .required("Cost is required"),
  time: yup.string(),
  location: yup.string(),
  notes: yup.string(),
});

// ----------------------------------------------------------------------

export function ItineraryItemForm({ isOpen, onClose, onSubmit, item = null }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itemSchema),
    defaultValues: {
      type: item?.type || "",
      title: item?.title || "",
      description: item?.description || "",
      cost: item?.cost || "",
      time: item?.time || "",
      location: item?.location || "",
      notes: item?.notes || "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <DialogTitle
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900 dark:text-white"
                  >
                    {item ? "Edit Item" : "Add New Item"}
                  </DialogTitle>
                  <Button
                    onClick={handleClose}
                    variant="soft"
                    color="neutral"
                    isIcon
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </Button>
                </div>

                <form
                  onSubmit={handleSubmit(handleFormSubmit)}
                  className="space-y-4"
                >
                  <Select
                    label="Item Type *"
                    placeholder="Select item type"
                    data={itemTypes}
                    {...register("type")}
                    error={errors.type?.message}
                  />

                  <Input
                    label="Title *"
                    placeholder="Enter item title"
                    {...register("title")}
                    error={errors.title?.message}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Cost *"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      {...register("cost")}
                      error={errors.cost?.message}
                    />
                    <Input
                      label="Time"
                      placeholder="e.g., 9:00 AM"
                      {...register("time")}
                      error={errors.time?.message}
                    />
                  </div>

                  <Input
                    label="Location"
                    placeholder="Enter location"
                    {...register("location")}
                    error={errors.location?.message}
                  />

                  <Textarea
                    label="Description"
                    placeholder="Enter item description"
                    rows={3}
                    {...register("description")}
                    error={errors.description?.message}
                  />

                  <Textarea
                    label="Notes"
                    placeholder="Additional notes"
                    rows={2}
                    {...register("notes")}
                    error={errors.notes?.message}
                  />

                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={handleClose}
                      variant="soft"
                      color="neutral"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      color="primary"
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      {item ? "Update Item" : "Add Item"}
                    </Button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
