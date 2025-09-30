// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { LeadForm } from "features/Leads/components/LeadForm";
import { addLeadToStorage, transformFormDataToLead } from "utils/leadsUtils";

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
  const [draftData, setDraftData] = useState(null);

  // Load draft data from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem("leadFormDraft");
    if (savedDraft) {
      try {
        setDraftData(JSON.parse(savedDraft));
      } catch (error) {
        console.error("Error parsing draft data:", error);
        localStorage.removeItem("leadFormDraft");
      }
    }
  }, []);

  // Save form data to localStorage whenever form changes
  const handleFormChange = (data) => {
    localStorage.setItem("leadFormDraft", JSON.stringify(data));
  };

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      // In a real app with Inertia.js, you would use:
      // router.post('/leads', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Creating lead with data:", data);
      // Transform form data to lead format and add to storage
      const leadData = transformFormDataToLead(data);
      const updatedLeads = addLeadToStorage(leadData);

      if (updatedLeads) {
        console.log("Lead successfully added to storage:", updatedLeads);
      }

      // Clear draft data after successful submission
      localStorage.removeItem("leadFormDraft");

      // Redirect to leads list after successful creation
      navigate("/leads/fresh");
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
              className="shrink-0 p-1"
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
          <LeadForm
            lead={draftData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onChange={handleFormChange}
          />

          {/* Continue Later Option */}
          {draftData && (
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                    Draft Saved
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-300">
                    Your form data has been automatically saved. You can
                    continue editing later.
                  </p>
                </div>
                <Button
                  component={Link}
                  to="/leads/edit"
                  variant="outlined"
                  color="primary"
                  size="sm"
                >
                  Continue Later
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
