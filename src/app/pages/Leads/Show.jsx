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
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card, Input, Select, Textarea } from "components/ui";
import { Page } from "components/shared/Page";
import { getStatusColor } from "features/Leads/libs/utils";
import { ROUTES, generateRoute } from "app/router/routes";

// ----------------------------------------------------------------------

const statusOptions = [
  { value: "fresh", label: "Fresh" },
  { value: "converted", label: "Converted" },
  { value: "postponed", label: "Postponed" },
  { value: "lost", label: "Lost" },
];

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

const mockQuotations = [
  {
    id: "QT001",
    lead_id: 1,
    title: "Paris Romantic Getaway Package",
    total_amount: 4800,
    status: "approved",
    created_at: "2024-01-18T14:20:00.000Z",
    valid_until: "2024-02-18T23:59:59.000Z",
    items_count: 8,
  },
  {
    id: "QT002",
    lead_id: 1,
    title: "Alternative Paris Package - Budget Friendly",
    total_amount: 3200,
    status: "pending",
    created_at: "2024-01-19T10:15:00.000Z",
    valid_until: "2024-02-19T23:59:59.000Z",
    items_count: 6,
  },
];

const mockProgressTimeline = [
  {
    id: 1,
    status: "fresh",
    title: "Lead Created",
    description: "Fresh lead created in the system",
    timestamp: "2024-01-15T10:30:00.000Z",
    user: "Sarah Wilson",
    is_current: false,
    is_completed: true,
  },
  {
    id: 2,
    status: "contacted",
    title: "Initial Contact",
    description: "First contact made with the customer",
    timestamp: "2024-01-15T14:15:00.000Z",
    user: "Sarah Wilson",
    is_current: false,
    is_completed: true,
  },
  {
    id: 3,
    status: "quoted",
    title: "Quotation Sent",
    description: "Travel quotation sent to customer",
    timestamp: "2024-01-18T14:20:00.000Z",
    user: "Sarah Wilson",
    is_current: false,
    is_completed: true,
  },
  {
    id: 4,
    status: "converted",
    title: "Lead Converted",
    description: "Customer accepted the quotation",
    timestamp: "2024-01-18T16:45:00.000Z",
    user: "Sarah Wilson",
    is_current: true,
    is_completed: true,
  },
  {
    id: 5,
    status: "booking",
    title: "Booking Confirmation",
    description: "Booking confirmed and payment processed",
    timestamp: null,
    user: null,
    is_current: false,
    is_completed: false,
  },
];

// ----------------------------------------------------------------------

export default function ShowLead() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [activity, setActivity] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [progressTimeline, setProgressTimeline] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  useEffect(() => {
    // In real app, data would come from API
    setLead(mockLead);
    setActivity(mockActivity);
    setQuotations(mockQuotations);
    setProgressTimeline(mockProgressTimeline);
    setNewStatus(mockLead.status);
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === lead.status) return;

    try {
      // In real app: API call to update status
      console.log("Updating status to:", newStatus);

      // Update lead status
      const updatedLead = {
        ...lead,
        status: newStatus,
        updated_at: new Date().toISOString(),
      };
      setLead(updatedLead);

      // Add status change to activity
      const statusActivity = {
        id: Date.now(),
        type: "status_change",
        content: `Lead status changed from ${lead.status} to ${newStatus}`,
        user: "Current User",
        created_at: new Date().toISOString(),
      };
      setActivity([statusActivity, ...activity]);

      // Update progress timeline
      const updatedTimeline = progressTimeline.map((item) => ({
        ...item,
        is_current: item.status === newStatus,
        is_completed: item.is_completed || item.status === newStatus,
      }));
      setProgressTimeline(updatedTimeline);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

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

              {/* Quotation History */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Quotation History
                </h2>

                {quotations.length > 0 ? (
                  <div className="space-y-4">
                    {quotations.map((quotation) => (
                      <div
                        key={quotation.id}
                        className="dark:border-dark-600 dark:hover:bg-dark-700 flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50"
                      >
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {quotation.title}
                            </h3>
                            <Badge
                              color={
                                quotation.status === "approved"
                                  ? "success"
                                  : quotation.status === "pending"
                                    ? "warning"
                                    : quotation.status === "rejected"
                                      ? "error"
                                      : "neutral"
                              }
                              className="capitalize"
                            >
                              {quotation.status}
                            </Badge>
                          </div>
                          <div className="dark:text-dark-300 flex items-center gap-4 text-sm text-gray-500">
                            <span>#{quotation.id}</span>
                            <span>
                              ${quotation.total_amount.toLocaleString()}
                            </span>
                            <span>{quotation.items_count} items</span>
                            <span>
                              Valid until{" "}
                              {new Date(
                                quotation.valid_until,
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            component={Link}
                            to={generateRoute.quotationShow(quotation.id)}
                            size="sm"
                            variant="soft"
                            color="info"
                          >
                            View
                          </Button>
                          <Button
                            component={Link}
                            to={generateRoute.quotationEdit(quotation.id)}
                            size="sm"
                            variant="soft"
                            color="warning"
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="dark:text-dark-300 py-8 text-center text-gray-500">
                    <DocumentTextIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
                    <p>No quotations created yet</p>
                    <Button
                      component={Link}
                      to={generateRoute.quotationCreate(lead.id)}
                      color="primary"
                      className="mt-4"
                    >
                      Create First Quotation
                    </Button>
                  </div>
                )}
              </Card>

              {/* Lead Progress Timeline */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Lead Progress Timeline
                </h2>

                <div className="space-y-4">
                  {progressTimeline.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            item.is_completed
                              ? item.is_current
                                ? "bg-success-100 border-success-500 dark:bg-success-900 border-2"
                                : "bg-success-500 dark:bg-success-600"
                              : "dark:bg-dark-600 dark:border-dark-500 border-2 border-gray-300 bg-gray-200"
                          } `}
                        >
                          {item.is_completed ? (
                            <CheckCircleIcon
                              className={`h-5 w-5 ${
                                item.is_current
                                  ? "text-success-600 dark:text-success-400"
                                  : "text-white"
                              }`}
                            />
                          ) : (
                            <ClockIcon className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        {index < progressTimeline.length - 1 && (
                          <div
                            className={`mt-2 h-8 w-0.5 ${
                              item.is_completed
                                ? "bg-success-500 dark:bg-success-600"
                                : "dark:bg-dark-600 bg-gray-200"
                            }`}
                          />
                        )}
                      </div>

                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`font-medium ${
                              item.is_current
                                ? "text-success-600 dark:text-success-400"
                                : item.is_completed
                                  ? "text-gray-900 dark:text-white"
                                  : "dark:text-dark-300 text-gray-500"
                            }`}
                          >
                            {item.title}
                          </h3>
                          {item.is_current && (
                            <Badge color="success" className="ml-2">
                              Current
                            </Badge>
                          )}
                        </div>

                        <p className="dark:text-dark-200 mt-1 text-sm text-gray-600">
                          {item.description}
                        </p>

                        {item.timestamp && (
                          <div className="dark:text-dark-400 mt-2 flex items-center gap-2 text-xs text-gray-500">
                            <span>
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                            {item.user && (
                              <>
                                <span>•</span>
                                <span>{item.user}</span>
                              </>
                            )}
                          </div>
                        )}

                        {item.is_current && !item.is_completed && (
                          <div className="mt-3">
                            <Button
                              size="sm"
                              color="success"
                              onClick={() => {
                                // Handle status progression
                                console.log(
                                  "Progress to next status:",
                                  item.status,
                                );
                              }}
                            >
                              Mark as Complete
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Activity Feed */}
              <Card className="p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Activity Feed & Notes
                </h2>

                <div className="space-y-4">
                  {activity.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 border-b border-gray-200 pb-4 last:border-0 dark:border-gray-700"
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            item.type === "status_change"
                              ? "bg-success-100 dark:bg-success-900"
                              : item.type === "note"
                                ? "bg-blue-100 dark:bg-blue-900"
                                : item.type === "call"
                                  ? "bg-yellow-100 dark:bg-yellow-900"
                                  : "bg-primary-100 dark:bg-primary-900"
                          } `}
                        >
                          {item.type === "status_change" && (
                            <CheckCircleIcon className="text-success-600 dark:text-success-400 h-4 w-4" />
                          )}
                          {item.type === "note" && (
                            <PlusIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          )}
                          {item.type === "call" && (
                            <PhoneIcon className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                          )}
                          {item.type === "email" && (
                            <EnvelopeIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                          )}
                          {!["status_change", "note", "call", "email"].includes(
                            item.type,
                          ) && (
                            <div className="bg-primary-600 dark:bg-primary-400 h-2 w-2 rounded-full"></div>
                          )}
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

              {/* Enhanced Lead Details */}
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
                      Priority
                    </span>
                    <Badge
                      color={
                        lead.priority === "urgent"
                          ? "error"
                          : lead.priority === "high"
                            ? "warning"
                            : lead.priority === "medium"
                              ? "info"
                              : "neutral"
                      }
                      className="capitalize"
                    >
                      {lead.priority}
                    </Badge>
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
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Last Updated
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(lead.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      Quotations
                    </span>
                    <span className="text-gray-900 dark:text-white">
                      {quotations.length} created
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
