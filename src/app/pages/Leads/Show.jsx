// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeftIcon,
  PencilIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CalendarIcon,
  UserGroupIcon,
  BanknotesIcon,
  PlusIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card, Input, Textarea } from "components/ui";
import { Page } from "components/shared/Page";
import { getStatusColor } from "features/Leads/libs/utils";
import { ROUTES, generateRoute } from "app/router/routes";

// ----------------------------------------------------------------------



// Enhanced Mock data
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
  notes:
    "Interested in a romantic getaway for anniversary. Prefers luxury accommodations.",
  status: "converted",
  assigned_agent: "Sarah Wilson",
  created_at: "2024-01-15T10:30:00.000Z",
  updated_at: "2024-01-18T14:20:00.000Z",
  priority: "high",
};

const mockActivity = [
  {
    id: 1,
    type: "note",
    content: "Initial contact made. Customer is very interested in Paris trip.",
    user: "Sarah Wilson",
    created_at: "2024-01-15T10:30:00.000Z",
  },
  {
    id: 2,
    type: "call",
    content: "Follow-up call scheduled for tomorrow at 2 PM",
    user: "Sarah Wilson",
    created_at: "2024-01-15T14:15:00.000Z",
  },
  {
    id: 3,
    type: "email",
    content: "Sent initial travel package proposal",
    user: "Sarah Wilson",
    created_at: "2024-01-16T09:00:00.000Z",
  },
  {
    id: 4,
    type: "status_change",
    content: "Lead status changed to converted after quotation creation",
    user: "Sarah Wilson",
    created_at: "2024-01-18T14:20:00.000Z",
  },
];




// ----------------------------------------------------------------------

export default function ShowLead() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [activity, setActivity] = useState([]);
 
  
  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  useEffect(() => {
    // In real app, data would come from API
    setLead(mockLead);
    setActivity(mockActivity); 
  }, [id]);



  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      // In real app: API call to save note
      console.log("Adding note:", newNote);

      const newActivity = {
        id: Date.now(),
        type: "note",
        content: newNote,
        user: "Current User",
        created_at: new Date().toISOString(),
      };

      setActivity([newActivity, ...activity]);
      setNewNote("");
      setFollowUpDate("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  if (!lead) {
    return (
      <Page title="Lead Details - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">Loading...</div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`Lead #${lead.id} - Travel CRM`}>
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                component={Link}
                to={ROUTES.LEADS.ALL}
                variant="soft"
                color="neutral"
                isIcon
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <div className="mt-2 flex items-center gap-3">
                  <h1 className="dark:text-dark-50 text-2xl font-bold tracking-wide text-gray-800">
                    Lead #{lead.id}
                  </h1>
                  <Badge
                    color={getStatusColor(lead.status)}
                    className="capitalize"
                  >
                    {lead.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {lead.customer_name} • {lead.destination}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                component={Link}
                to={generateRoute.quotationCreate(lead.id)}
                color="success"
                className="shrink-0"
              >
                <DocumentTextIcon className="mr-2 h-5 w-5" />
                New Quotation
              </Button>
              <Button
                component={Link}
                to={generateRoute.leadEditAlt(lead.id)}
                color="primary"
                className="shrink-0"
              >
                <PencilIcon className="mr-2 h-5 w-5" />
                Edit Lead
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Lead Information */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Lead Information
                </h2>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Phone
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {lead.customer_phone}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Email
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {lead.customer_email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPinIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Destination
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {lead.destination}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Travel Dates
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {lead.travel_dates}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <UserGroupIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Group Size
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {lead.group_size}{" "}
                          {lead.group_size === 1 ? "person" : "people"}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <BanknotesIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Budget
                        </div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          ${lead.budget.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {lead.notes && (
                  <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                      Notes
                    </div>
                    <div className="text-gray-900 dark:text-white">
                      {lead.notes}
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">


              {/* Enhanced Add Notes */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Add Notes & Follow-up
                </h3>
                <div className="space-y-4">
                  <Textarea
                    label="Note *"
                    placeholder="Add a detailed note about this lead..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={4}
                    required
                  />
                  <Input
                    label="Next Follow-up Date & Time"
                    type="datetime-local"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                    helperText="Optional: Schedule a follow-up reminder"
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleAddNote}
                      color="primary"
                      className="flex-1"
                      disabled={!newNote.trim()}
                    >
                      <PlusIcon className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                    {newNote.trim() && (
                      <Button
                        variant="outlined"
                        color="neutral"
                        onClick={() => {
                          setNewNote("");
                          setFollowUpDate("");
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
