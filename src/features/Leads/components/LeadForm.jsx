// Import Dependencies
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Local Imports
import { Button, Card, Input, Select, Textarea } from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";

// ----------------------------------------------------------------------

// Validation Schema
const leadSchema = yup.object({
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
  notes: yup.string(),
});

const leadSources = [
  { value: "website", label: "Website" },
  { value: "referral", label: "Referral" },
  { value: "social_media", label: "Social Media" },
  { value: "google_ads", label: "Google Ads" },
  { value: "travel_agent", label: "Travel Agent" },
  { value: "other", label: "Other" },
];

// ----------------------------------------------------------------------

export function LeadForm({ lead = null, onSubmit, isLoading = false }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(leadSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
      customer_email: "",
      destination: "",
      budget: "",
      travel_dates: [], // 👈 must be array
      group_size: 1,
      lead_source: "",
      notes: "",
    },
  });

  // Pre-populate form if editing
  useEffect(() => {
    if (lead) {
      reset({
        customer_name: lead.customer_name || "",
        customer_phone: lead.customer_phone || "",
        customer_email: lead.customer_email || "",
        destination: lead.destination || "",
        budget: lead.budget || "",
        travel_dates: lead.travel_dates || [],
        group_size: lead.group_size || 1,
        lead_source: lead.lead_source || "",
        notes: lead.notes || "",
      });
    }
  }, [lead, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Customer Information */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
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
              label="Phone Number *"
              placeholder="Enter phone number"
              type="tel"
              {...register("customer_phone")}
              error={errors.customer_phone?.message}
            />
            <Input
              label="Email Address *"
              placeholder="Enter email address"
              type="email"
              {...register("customer_email")}
              error={errors.customer_email?.message}
            />
          </div>
        </div>

        {/* Trip Information */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            Trip Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Destination *"
              placeholder="Enter destination"
              {...register("destination")}
              error={errors.destination?.message}
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

        {/* Lead Source and Notes */}
        <div className="space-y-4">
          <Select
            label="Lead Source *"
            placeholder="Select lead source"
            data={leadSources}
            {...register("lead_source")}
            error={errors.lead_source?.message}
          />
          <Textarea
            label="Notes"
            placeholder="Additional notes about this lead..."
            rows={4}
            {...register("notes")}
            error={errors.notes?.message}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {lead ? "Update Lead" : "Create Lead"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
