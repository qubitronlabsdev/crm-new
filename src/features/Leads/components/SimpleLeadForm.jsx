// Import Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useState } from "react";

// Local Imports
import { Button, Card, Input, Select } from "components/ui";
import simpleLeadSchema from "../schema/simple-lead-schema";
import { ROUTES } from "../../../app/router/routes";

// ----------------------------------------------------------------------

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

export function SimpleLeadForm({ onSubmit, isLoading = false }) {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(simpleLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      agent_assignment: "",
      status: "fresh",
      priority: "medium",
      lead_source: "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsCreating(true);
    try {
      // Call the parent onSubmit function
      await onSubmit(data);

      // For demo purposes, create a mock lead ID
      const mockLeadId = Date.now().toString();

      // Navigate to quotations create page with lead ID
      navigate(`${ROUTES.QUOTATIONS.CREATE}?leadId=${mockLeadId}`);
    } catch (error) {
      console.error("Error creating lead:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create New Lead
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Enter basic customer information to create a lead and proceed to
          quotation
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Customer Information
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Input
              label="Name *"
              placeholder="Enter full name"
              {...register("name")}
              error={errors.name?.message}
            />
            <Input
              label="Email *"
              placeholder="Enter email address"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />
            <Input
              label="Phone *"
              placeholder="Enter phone number"
              type="tel"
              {...register("phone")}
              error={errors.phone?.message}
            />
          </div>
        </div>

        {/* Lead Management */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Lead Details
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Select
              label="Agent Assignment *"
              placeholder="Select agent"
              data={agentOptions}
              {...register("agent_assignment")}
              error={errors.agent_assignment?.message}
            />
            <Select
              label="Lead Source *"
              placeholder="Select lead source"
              data={leadSources}
              {...register("lead_source")}
              error={errors.lead_source?.message}
            />
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
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="soft"
              color="neutral"
              onClick={() => navigate(ROUTES.LEADS.ALL)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={isCreating || isLoading}
              disabled={isCreating || isLoading}
              className="min-w-[160px]"
            >
              {isCreating ? "Creating Lead..." : "Create Lead & Continue"}
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
