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
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card, Input, Select, Textarea } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Leads", href: "/leads/all" },
  { label: "Lead Details" },
];

const statusOptions = [
  { value: "new", label: "New" },
  { value: "qualified", label: "Qualified" },
  { value: "in_progress", label: "In Progress" },
  { value: "postponed", label: "Postponed" },
  { value: "lost", label: "Lost" },
];

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "new":
      return "info";
    case "qualified":
      return "success";
    case "in_progress":
      return "warning";
    case "postponed":
      return "secondary";
    case "lost":
      return "error";
    default:
      return "neutral";
  }
};

// Mock data
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
  status: "new",
  assigned_agent: "Sarah Wilson",
  created_at: "2024-01-15",
};

const mockActivity = [
  {
    id: 1,
    type: "note",
    content: "Initial contact made. Customer is very interested in Paris trip.",
    user: "Sarah Wilson",
    created_at: "2024-01-15 10:30:00",
  },
  {
    id: 2,
    type: "call",
    content: "Follow-up call scheduled for tomorrow at 2 PM",
    user: "Sarah Wilson",
    created_at: "2024-01-15 14:15:00",
  },
  {
    id: 3,
    type: "email",
    content: "Sent initial travel package proposal",
    user: "Sarah Wilson",
    created_at: "2024-01-16 09:00:00",
  },
];

// ----------------------------------------------------------------------

export default function ShowLead() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [activity, setActivity] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  useEffect(() => {
    // In real app, data would come from Inertia.js props
    setLead(mockLead);
    setActivity(mockActivity);
    setNewStatus(mockLead.status);
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === lead.status) return;

    try {
      // In real app: router.patch(`/leads/${id}/status`, { status: newStatus })
      console.log("Updating status to:", newStatus);
      setLead({ ...lead, status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      // In real app: router.post(`/leads/${id}/notes`, { content: newNote, follow_up_date: followUpDate })
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
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">Loading...</div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`Lead #${lead.id} - Travel CRM`}>
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Button
                component={Link}
                to="/leads/all"
                variant="soft"
                color="neutral"
                isIcon
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <Breadcrumbs items={breadcrumbItems} />
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
            <Button
              component={Link}
              to={`/leads/${lead.id}/edit`}
              color="primary"
              className="shrink-0"
            >
              <PencilIcon className="mr-2 h-5 w-5" />
              Edit Lead
            </Button>
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

              {/* Activity Feed */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Activity Feed
                </h2>

                <div className="space-y-4">
                  {activity.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
                    >
                      <div className="flex-shrink-0">
                        <div className="bg-primary-100 dark:bg-primary-900 flex h-8 w-8 items-center justify-center rounded-full">
                          <div className="bg-primary-600 dark:bg-primary-400 h-2 w-2 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-900 dark:text-white">
                          {item.content}
                        </div>
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {item.user} •{" "}
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Update */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Update Status
                </h3>
                <div className="space-y-4">
                  <Select
                    label="Lead Status"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    data={statusOptions}
                  />
                  <Button
                    onClick={handleStatusUpdate}
                    color="primary"
                    className="w-full"
                    disabled={!newStatus || newStatus === lead.status}
                  >
                    Update Status
                  </Button>
                </div>
              </Card>

              {/* Add Follow-up */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Add Follow-up
                </h3>
                <div className="space-y-4">
                  <Textarea
                    label="Note"
                    placeholder="Add a note about this lead..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                  />
                  <Input
                    label="Next Follow-up Date"
                    type="datetime-local"
                    value={followUpDate}
                    onChange={(e) => setFollowUpDate(e.target.value)}
                  />
                  <Button
                    onClick={handleAddNote}
                    color="success"
                    className="w-full"
                    disabled={!newNote.trim()}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </div>
              </Card>

              {/* Lead Details */}
              <Card className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Lead Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Lead Source
                    </span>
                    <span className="text-gray-900 capitalize dark:text-white">
                      {lead.lead_source.replace("_", " ")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Assigned Agent
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {lead.assigned_agent}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Created
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </span>
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
