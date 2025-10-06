// Import Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

// Local Imports
import { Button, Card, Input, Select, Textarea } from "components/ui";
import itinerarySchema from "../schema/itinerary-schema";
import { ROUTES } from "../../../app/router/routes";

// ----------------------------------------------------------------------

const statusOptions = [
  { value: "draft", label: "Draft" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

const agentOptions = [
  { value: "john_doe", label: "John Doe" },
  { value: "jane_smith", label: "Jane Smith" },
  { value: "mike_johnson", label: "Mike Johnson" },
  { value: "sarah_wilson", label: "Sarah Wilson" },
  { value: "david_brown", label: "David Brown" },
];

const accommodationOptions = [
  { value: "hotel", label: "Hotel" },
  { value: "resort", label: "Resort" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "hostel", label: "Hostel" },
  { value: "cruise", label: "Cruise" },
  { value: "other", label: "Other" },
];

const transportationOptions = [
  { value: "flight", label: "Flight" },
  { value: "train", label: "Train" },
  { value: "bus", label: "Bus" },
  { value: "car_rental", label: "Car Rental" },
  { value: "cruise", label: "Cruise" },
  { value: "private_transfer", label: "Private Transfer" },
  { value: "mixed", label: "Mixed" },
];

// ----------------------------------------------------------------------

export function ItineraryForm({
  onSubmit,
  isLoading = false,
  initialData = null,
  isEditMode = false,
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(itinerarySchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      customer_name: "",
      customer_email: "",
      destination: "",
      start_date: "",
      end_date: "",
      duration_days: 1,
      total_cost: "",
      status: "draft",
      priority: "medium",
      agent_assigned: "",
      departure_city: "",
      accommodation_type: "",
      transportation_mode: "",
      special_requirements: "",
      notes: "",
    },
  });

  // Watch start and end dates to calculate duration
  const startDate = watch("start_date");
  const endDate = watch("end_date");

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setValue("duration_days", diffDays || 1);
    }
  }, [startDate, endDate, setValue]);

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Call the parent onSubmit function
      await onSubmit(data);

      // Navigate to itineraries list after successful submission
      navigate(ROUTES.ITINERARIES.ALL);
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} itinerary:`,
        error,
      );
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {isEditMode ? "Edit Itinerary" : "Create New Itinerary"}
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {isEditMode
            ? "Update travel itinerary details and information"
            : "Create a comprehensive travel itinerary for your customer"}
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 gap-4">
            <Input
              label="Itinerary Title *"
              placeholder="Enter a descriptive title for the itinerary"
              {...register("title")}
              error={errors.title?.message}
            />
            <Textarea
              label="Description *"
              placeholder="Describe the travel itinerary details"
              rows={3}
              {...register("description")}
              error={errors.description?.message}
            />
          </div>
        </div>

        {/* Customer Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Customer Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Customer Name *"
              placeholder="Enter customer name"
              {...register("customer_name")}
              error={errors.customer_name?.message}
            />
            <Input
              label="Customer Email *"
              placeholder="Enter customer email"
              type="email"
              {...register("customer_email")}
              error={errors.customer_email?.message}
            />
          </div>
        </div>

        {/* Travel Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Travel Details
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Destination *"
              placeholder="Enter destination"
              {...register("destination")}
              error={errors.destination?.message}
            />
            <Input
              label="Departure City *"
              placeholder="Enter departure city"
              {...register("departure_city")}
              error={errors.departure_city?.message}
            />
            <Input
              label="Start Date *"
              type="date"
              {...register("start_date")}
              error={errors.start_date?.message}
            />
            <Input
              label="End Date *"
              type="date"
              {...register("end_date")}
              error={errors.end_date?.message}
            />
            <Input
              label="Duration (Days) *"
              type="number"
              min="1"
              {...register("duration_days")}
              error={errors.duration_days?.message}
              readOnly
            />
            <Input
              label="Total Cost ($) *"
              placeholder="Enter total cost"
              type="number"
              min="0"
              step="0.01"
              {...register("total_cost")}
              error={errors.total_cost?.message}
            />
          </div>
        </div>

        {/* Management Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Management Details
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Select
              label="Status *"
              placeholder="Select status"
              data={statusOptions}
              {...register("status")}
              error={errors.status?.message}
            />
            <Select
              label="Priority *"
              placeholder="Select priority"
              data={priorityOptions}
              {...register("priority")}
              error={errors.priority?.message}
            />
            <Select
              label="Assigned Agent *"
              placeholder="Select agent"
              data={agentOptions}
              {...register("agent_assigned")}
              error={errors.agent_assigned?.message}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Additional Details
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Select
              label="Accommodation Type"
              placeholder="Select accommodation type"
              data={accommodationOptions}
              {...register("accommodation_type")}
              error={errors.accommodation_type?.message}
            />
            <Select
              label="Transportation Mode"
              placeholder="Select transportation mode"
              data={transportationOptions}
              {...register("transportation_mode")}
              error={errors.transportation_mode?.message}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Textarea
              label="Special Requirements"
              placeholder="Any special requirements or requests"
              rows={3}
              {...register("special_requirements")}
              error={errors.special_requirements?.message}
            />
            <Textarea
              label="Notes"
              placeholder="Additional notes about the itinerary"
              rows={3}
              {...register("notes")}
              error={errors.notes?.message}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="soft"
              color="neutral"
              onClick={() => navigate(ROUTES.ITINERARIES.ALL)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isSubmitting || isLoading}
              disabled={isSubmitting || isLoading}
              className="min-w-[160px]"
            >
              {isSubmitting
                ? `${isEditMode ? "Updating" : "Creating"} Itinerary...`
                : isEditMode
                  ? "Update Itinerary"
                  : "Create Itinerary"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
