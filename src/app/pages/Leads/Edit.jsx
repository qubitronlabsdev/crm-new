// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { LeadForm } from "features/Leads/components/LeadForm";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Leads", href: "/leads" },
  { label: "Edit Lead" },
];

// Mock data - in real app this would come from Inertia.js props
const mockLead = {
  id: 1,
  customer_name: "John Smith",
  customer_phone: "+1 (555) 123-4567",
  customer_email: "john.smith@email.com",
  destination: "Paris, France",
  budget: 5000,
  travel_dates: "2024-06-15 to 2024-06-25",
  group_size: 2,
  lead_source: "website",
  notes: "Interested in a romantic getaway for anniversary",
  status: "new",
  assigned_agent: "Sarah Wilson",
  created_at: "2024-01-15",
};

// ----------------------------------------------------------------------

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lead, setLead] = useState(null);

  useEffect(() => {
    // In real app, lead data would come from Inertia.js props
    // Here we simulate loading the lead data
    setLead(mockLead);
  }, [id]);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      // In a real app with Inertia.js, you would use:
      // router.patch(`/leads/${id}`, data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating lead with data:", data);

      // Redirect to leads list after successful update
      navigate("/leads");
    } catch (error) {
      console.error("Error updating lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!lead) {
    return (
      <Page title="Edit Lead - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">Loading...</div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Edit Lead - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              component={Link}
              to="/leads"
              variant="soft"
              color="neutral"
              isIcon
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Edit Lead #{lead.id}
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Update lead information for {lead.customer_name}
              </p>
            </div>
          </div>

          {/* Lead Form */}
          <LeadForm lead={lead} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </Page>
  );
}
