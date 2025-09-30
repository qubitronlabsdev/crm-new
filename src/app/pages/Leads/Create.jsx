// Import Dependencies
import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
  { label: "Create Lead" },
];

// ----------------------------------------------------------------------

export default function CreateLead() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      // In a real app with Inertia.js, you would use:
      // router.post('/leads', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Creating lead with data:", data);

      // Redirect to leads list after successful creation
      navigate("/leads");
    } catch (error) {
      console.error("Error creating lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Page title="Create Lead - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              component={Link}
              to="/leads"
              variant="outlined"
              isIcon
              className="shrink-0"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Create New Lead
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Add a new potential customer inquiry to the system
              </p>
            </div>
          </div>

          {/* Form */}
          <LeadForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </Page>
  );
}
