// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { LeadForm } from "features/Leads/components/LeadForm";
import { ROUTES } from "app/router/routes";
import {
  getLeadById,
  transformLeadToFormData,
} from "features/Leads/libs/utils/leadsUtils";
// ----------------------------------------------------------------------

export default function EditLead() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [lead, setLead] = useState(null);
  const [draftData, setDraftData] = useState(null);

  useEffect(() => {
    // Load lead data based on ID
    if (id) {
      console.log("Loading lead with ID:", id);
      // Load existing lead data from localStorage
      const leadData = getLeadById(id);
      console.log("Found lead data:", leadData);
      if (leadData) {
        // Transform lead data to form format and set it
        const formData = transformLeadToFormData(leadData);
        console.log("Transformed form data:", formData);
        setLead(formData);
      } else {
        console.error(`Lead with ID ${id} not found`);
        // Optionally redirect to leads list or show error
        // navigate('/leads');
      }
    } else {
      // If no ID (new lead), try to load draft data
      const savedDraft = localStorage.getItem("leadFormDraft");
      if (savedDraft) {
        try {
          const parsedDraft = JSON.parse(savedDraft);
          setDraftData(parsedDraft);
        } catch (error) {
          console.error("Error parsing draft data:", error);
          localStorage.removeItem("leadFormDraft");
        }
      }
    }
  }, [id]);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      // In a real app with Inertia.js, you would use:
      // router.patch(`/leads/${id}`, data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Updating lead with data:", data);

      // Clear draft data after successful update
      localStorage.removeItem("leadFormDraft");

      // Redirect to leads list after successful update
      navigate(ROUTES.LEADS.ALL);
    } catch (error) {
      console.error("Error updating lead:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // if (!lead && !draftData) {
  //   return (
  //     <Page title="Edit Lead - Travel CRM">
  //       <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
  //         <div className="flex h-64 items-center justify-center">
  //           <div className="dark:text-dark-200 text-gray-500">Loading...</div>
  //         </div>
  //       </div>
  //     </Page>
  //   );
  // }

  // Use lead data if available, otherwise use draft data
  const formData = lead || draftData;

  return (
    <Page title="Edit Lead - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button
              component={Link}
              to={ROUTES.LEADS.ALL}
              variant="outlined"
              color="neutral"
              className="shrink-0 p-1"
              isIcon
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                {lead ? `Edit Lead #${lead.id}` : "Continue Lead Creation"}
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                {lead
                  ? `Update lead information for ${lead.customer_name}`
                  : "Continue with your draft lead information"}
              </p>
            </div>
          </div>

          {/* Lead Form */}
          <LeadForm
            lead={formData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Page>
  );
}
