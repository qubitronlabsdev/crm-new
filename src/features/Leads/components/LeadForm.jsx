// Import Dependencies
import { useEffect, useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card, Input, Select, Textarea } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";

// ----------------------------------------------------------------------

// Validation Schema
const leadSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  agent_assignment: yup.string().required("Agent assignment is required"),
  travel_date: yup.string(),
  travel_time: yup.string(),
  status: yup.string().required("Status is required"),
  priority: yup.string().required("Priority is required"),
  customer_name: yup.string().required("Customer name is required"),
  customer_phone: yup.string().required("Phone number is required"),
  customer_email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),
  destination: yup.string().required("Destination is required"),
  budget: yup
    .number()
    .min(0, "Budget must be positive")
    .required("Budget is required"),
  travel_dates: yup
    .array()
    .of(yup.date().required())
    .min(2, "Please select both start and end dates")
    .required("Travel dates are required"),

  group_size: yup
    .number()
    .min(1, "Group size must be at least 1")
    .required("Group size is required"),
  lead_source: yup.string().required("Lead source is required"),
  days: yup
    .number()
    .min(1, "Days must be at least 1")
    .required("Days is required"),
  adults: yup
    .number()
    .min(1, "Adults must be at least 1")
    .required("Adults is required"),
  children: yup
    .number()
    .min(0, "Children must be at least 0")
    .required("Children is required"),
  children_age: yup.string(),
  departure_city: yup.string().required("Departure city is required"),
  estimated_value: yup
    .number()
    .min(0, "Estimated value must be positive")
    .required("Estimated value is required"),
  expected_close_date: yup.string(),
  travel_preferences: yup.string(),
  notes: yup.string(),
});

const leadSources = [
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

const statusOptions = [
  { value: "fresh", label: "Fresh" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "negotiation", label: "Negotiation" },
  { value: "closed_won", label: "Closed Won" },
  { value: "closed_lost", label: "Closed Lost" },
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
  { value: "unassigned", label: "Unassigned" },
];

// ----------------------------------------------------------------------

export function LeadForm({
  lead = null,
  onSubmit,
  isLoading = false,
  onChange,
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      agent_assignment: "",
      travel_date: "",
      travel_time: "",
      status: "fresh",
      priority: "medium",
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      destination: "",
      budget: "",
      travel_dates: [], // 👈 must be array
      group_size: 1,
      lead_source: "",
      days: 1,
      adults: 1,
      children: 0,
      children_age: "",
      departure_city: "",
      estimated_value: "",
      expected_close_date: "",
      travel_preferences: "",
      notes: "",
    },
  });

  // Pre-populate form if editing
  useEffect(() => {
    if (lead) {
      reset({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        agent_assignment: lead.agent_assignment || "",
        travel_date: lead.travel_date || "",
        travel_time: lead.travel_time || "",
        status: lead.status || "fresh",
        priority: lead.priority || "medium",
        customer_name: lead.customer_name || "",
        customer_phone: lead.customer_phone || "",
        customer_email: lead.customer_email || "",
        destination: lead.destination || "",
        budget: lead.budget || "",
        travel_dates: lead.travel_dates || [],
        group_size: lead.group_size || 1,
        lead_source: lead.lead_source || "",
        days: lead.days || 1,
        adults: lead.adults || 1,
        children: lead.children || 0,
        children_age: lead.children_age || "",
        departure_city: lead.departure_city || "",
        estimated_value: lead.estimated_value || "",
        expected_close_date: lead.expected_close_date || "",
        travel_preferences: lead.travel_preferences || "",
        notes: lead.notes || "",
      });
    }
  }, [lead, reset]);

  // State for children ages and dropdown
  const [childrenAges, setChildrenAges] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Watch children count
  const childrenCount = watch("children", 0);

  // Update the main children_age field
  const updateChildrenAgeField = useCallback(
    (ages) => {
      const agesString = ages
        .filter((child) => child.age && child.age.trim() !== "")
        .map((child) => child.age)
        .join(", ");
      setValue("children_age", agesString);
    },
    [setValue],
  );

  // Update children ages array when children count changes
  useEffect(() => {
    const count = Number(childrenCount) || 0;
    setChildrenAges((prevAges) => {
      const newAges = Array.from({ length: count }, (_, index) => ({
        id: index,
        age: prevAges[index]?.age || "",
      }));

      // Update the form field
      updateChildrenAgeField(newAges);
      return newAges;
    });
  }, [childrenCount, updateChildrenAgeField]);

  // Update individual child age
  const updateChildAge = (childIndex, age) => {
    const newAges = [...childrenAges];
    newAges[childIndex] = { ...newAges[childIndex], age };
    setChildrenAges(newAges);
    updateChildrenAgeField(newAges);
  };

  // Get display text for the trigger
  const getDisplayText = () => {
    const filledAges = childrenAges.filter(
      (child) => child.age && child.age.trim() !== "",
    );
    if (filledAges.length === 0) {
      return childrenCount > 0 ? "Select children ages..." : "No children";
    }
    return filledAges.map((child) => `${child.age} years`).join(", ");
  };

  // Watch all form values for changes and call onChange
  const watchedValues = watch();
  useEffect(() => {
    if (onChange && watchedValues) {
      // Debounce the onChange calls to avoid too frequent updates
      const timeoutId = setTimeout(() => {
        onChange(watchedValues);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [watchedValues, onChange]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
            <h3 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
              Personal Information
            </h3>
            <p className="dark:text-dark-200 mt-1 text-sm text-gray-600">
              Basic contact information and personal details
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Input
              label="Name *"
              placeholder="Enter full name"
              {...register("name")}
              error={errors.name?.message}
              className="w-full"
            />
            <Input
              label="Email *"
              placeholder="Enter email address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              className="w-full"
            />
            <Input
              label="Phone *"
              placeholder="Enter phone number"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
              className="w-full"
            />
            <Select
              label="Agent Assignment *"
              placeholder="Select agent"
              data={agentOptions}
              {...register("agent_assignment")}
              error={errors.agent_assignment?.message}
              className="w-full"
            />
            <div className="lg:col-span-1">
              <DatePicker
                label="Travel Date *"
                placeholder="mm/dd/yyyy"
                options={{
                  dateFormat: "m/d/Y",
                  allowInput: true,
                }}
                hasCalenderIcon={true}
                {...register("travel_date")}
                error={errors.travel_date?.message}
                className="w-full"
              />
            </div>
            <Input
              label="Travel Time *"
              placeholder="Enter travel time (e.g., 10:30 AM)"
              type="time"
              {...register("travel_time")}
              error={errors.travel_time?.message}
              className="w-full"
            />

            <Select
              label="Status *"
              placeholder="Select status"
              data={statusOptions}
              {...register("status")}
              error={errors.status?.message}
              className="w-full"
            />
            <Select
              label="Priority *"
              placeholder="Select priority"
              data={priorityOptions}
              {...register("priority")}
              error={errors.priority?.message}
              className="w-full"
            />
            <Select
              label="Lead Source *"
              placeholder="Select lead source"
              data={leadSources}
              {...register("lead_source")}
              error={errors.lead_source?.message}
              className="w-full"
            />
          </div>
        </div>

        {/* Trip Details */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
            <h3 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
              Trip Details
            </h3>
            <p className="dark:text-dark-200 mt-1 text-sm text-gray-600">
              Duration and destination information
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Input
              label="Days *"
              placeholder="Number of days"
              type="number"
              min="1"
              {...register("days", { valueAsNumber: true })}
              error={errors.days?.message}
              className="w-full"
            />
            <DatePicker
              label="Expected Close Date *"
              placeholder="mm/dd/yyyy"
              options={{
                dateFormat: "m/d/Y",
                allowInput: true,
              }}
              hasCalenderIcon={true}
              {...register("expected_close_date")}
              error={errors.expected_close_date?.message}
              className="w-full"
            />
            <Input
              label="Estimated Value *"
              placeholder="Enter estimated value"
              type="number"
              min="0"
              step="0.01"
              {...register("estimated_value", { valueAsNumber: true })}
              error={errors.estimated_value?.message}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Input
              label="Adults *"
              placeholder="Number of adults"
              type="number"
              min="1"
              {...register("adults", { valueAsNumber: true })}
              error={errors.adults?.message}
              className="w-full"
            />
            <Input
              label="Children *"
              placeholder="Number of children"
              type="number"
              min="0"
              {...register("children", { valueAsNumber: true })}
              error={errors.children?.message}
              className="w-full"
            />
            {/* Custom Multi-Select Children Age Field */}
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Children Ages
              </label>

              <div className="relative">
                {/* Trigger Button */}
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  disabled={childrenCount === 0}
                  className={`w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-left shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 ${childrenCount === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:border-gray-400"} flex min-h-[42px] items-center justify-between`}
                >
                  <span
                    className={`block truncate ${getDisplayText() === "No children" || getDisplayText() === "Select children ages..." ? "text-gray-500" : "text-gray-900 dark:text-white"}`}
                  >
                    {getDisplayText()}
                  </span>
                  <ChevronDownIcon
                    className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown Content */}
                {isDropdownOpen && childrenCount > 0 && (
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
                          onClick={() => setIsDropdownOpen(false)}
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
                <p className="mt-1 text-sm text-red-600">
                  {errors.children_age.message}
                </p>
              )}

              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {childrenCount === 0
                  ? "Enter number of children above to specify ages"
                  : "e.g. 5, 8, 12"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Input
              label="Departure City *"
              placeholder="Enter departure city"
              {...register("departure_city")}
              error={errors.departure_city?.message}
              className="w-full"
            />
            <Input
              label="Destination *"
              placeholder="Enter destination"
              {...register("destination")}
              error={errors.destination?.message}
              className="w-full"
            />
            <Input
              label="Budget *"
              placeholder="Enter budget"
              type="number"
              min="0"
              step="0.01"
              {...register("budget")}
              error={errors.budget?.message}
            />

            {/* Travel Dates with Controller */}
            <div className="md:col-span-1">
              <Controller
                name="travel_dates"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Travel Dates *"
                    placeholder="Select travel dates"
                    options={{
                      mode: "range",
                      dateFormat: "Y-m-d",
                    }}
                    hasCalenderIcon={true}
                    value={field.value}
                    onChange={(dates) => field.onChange(dates)}
                    error={errors.travel_dates?.message}
                  />
                )}
              />
            </div>

            <Input
              label="Group Size *"
              placeholder="Number of travelers"
              type="number"
              min="1"
              {...register("group_size")}
              error={errors.group_size?.message}
            />
          </div>
        </div>

        {/* Lead Information */}
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4 dark:border-gray-700">
            <h3 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
              Additional Information
            </h3>
            <p className="dark:text-dark-200 mt-1 text-sm text-gray-600">
              Travel preferences and additional notes
            </p>
          </div>

          <Textarea
            label="Travel Preferences"
            placeholder="Enter any specific travel preferences..."
            rows={4}
            {...register("travel_preferences")}
            error={errors.travel_preferences?.message}
            className="w-full"
            helpText="Include any specific preferences, budget range, accommodation type, activities, etc."
          />

          <Textarea
            label="Notes"
            placeholder="Enter any additional notes..."
            rows={3}
            {...register("notes")}
            error={errors.notes?.message}
            className="w-full"
            helpText="Any other relevant information about this lead"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            disabled={isLoading}
            className="min-w-[140px]"
          >
            {lead ? "Update Lead" : "Create Lead"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
