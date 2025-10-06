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
  PlusIcon,
  DocumentTextIcon,
  ClockIcon,
  FlagIcon,
  StarIcon,
  IdentificationIcon,
  AcademicCapIcon,
  HeartIcon,
  CurrencyDollarIcon,
  CalendarDaysIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card, Input, Textarea } from "components/ui";
import { Page } from "components/shared/Page";
import { getStatusColor } from "features/Leads/libs/utils";
import { ROUTES, generateRoute } from "app/router/routes";

// ----------------------------------------------------------------------

// Enhanced Mock data with all lead form schema fields
const mockLead = {
  id: 1,
  // Basic Contact Information
  name: "John Smith",
  customer_name: "John Smith",
  email: "john.smith@email.com",
  customer_email: "john.smith@email.com",
  phone: "+1 (555) 123-4567",
  customer_phone: "+1 (555) 123-4567",

  // Lead Management
  agent_assignment: "Sarah Wilson",
  assigned_agent: "Sarah Wilson",
  status: "converted",
  priority: "high",
  lead_source: "website",

  // Travel Information
  travel_date: "2024-06-15",
  travel_time: "09:00 AM",
  travel_dates: "2024-06-15 to 2024-06-25",
  destination: "Paris, France",
  departure_city: "New York",
  days: 10,

  // Travelers Information
  adults: 2,
  children: 0,
  children_age: "",
  group_size: 2,

  // Financial Information
  estimated_value: 5000,
  budget: 5000,
  expected_close_date: "2024-05-15",

  // Additional Information
  travel_preferences:
    "Luxury accommodations, romantic settings, fine dining experiences, cultural tours, premium transportation",
  notes:
    "Interested in a romantic getaway for anniversary. Prefers luxury accommodations and would like to experience authentic French cuisine. Has dietary restrictions (vegetarian). Looking for a mix of relaxation and cultural activities.",

  // System Fields
  created_at: "2024-01-15T10:30:00.000Z",
  updated_at: "2024-01-18T14:20:00.000Z",
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
  const [activeTab, setActiveTab] = useState("contact");
  const [newNote, setNewNote] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");

  // Lead Progress States
  const [currentStatus, setCurrentStatus] = useState("contacting");
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);

  // Define the status progression
  const statusSteps = [
    { id: "quoting", label: "Quoting", order: 1 },
    { id: "contacting", label: "Contacting", order: 2 },
    { id: "customizing", label: "Customizing", order: 3 },
    { id: "finalizing", label: "Finalizing", order: 4 },
    { id: "converted", label: "Converted", order: 5 },
    { id: "trip_completed", label: "Trip Completed", order: 6 },
  ];

  const tabs = [
    { id: "contact", label: "Contact Information", icon: IdentificationIcon },
    { id: "travel", label: "Travel Details", icon: MapPinIcon },
    { id: "business", label: "Business Information", icon: CurrencyDollarIcon },
  ];

  useEffect(() => {
    // In real app, data would come from API
    setLead(mockLead);
    setActivity(mockActivity);
    setCurrentStatus(mockLead.status);
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

  // Lead Progress Handlers
  const handleStatusUpdate = (newStatus) => {
    setCurrentStatus(newStatus);
    setLead((prev) => ({ ...prev, status: newStatus }));
    setShowStatusUpdate(false);

    // Add activity log
    const newActivity = {
      id: Date.now(),
      type: "status_change",
      content: `Lead status changed to ${newStatus}`,
      user: "Current User",
      created_at: new Date().toISOString(),
    };
    setActivity([newActivity, ...activity]);
  };

  const handleRemoveLead = () => {
    if (window.confirm("Are you sure you want to remove this lead?")) {
      // In real app: API call to delete lead
      console.log("Removing lead:", lead.id);
      // Navigate back to leads list
      window.history.back();
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      call_not_picked: "Marked as unable to reach customer",
      share_whatsapp: "Quote shared on WhatsApp",
      resend_quote: "Quote resent with reminder set",
      set_reminder: "Reminder set for next call",
    };

    const newActivity = {
      id: Date.now(),
      type: "action",
      content: actionMessages[action] || `Action performed: ${action}`,
      user: "Current User",
      created_at: new Date().toISOString(),
    };
    setActivity([newActivity, ...activity]);
  };

  const getCurrentStatusStep = () => {
    return statusSteps.find(
      (step) => step.id === (lead?.status || currentStatus),
    );
  };

  const getNextStatus = () => {
    const current = getCurrentStatusStep();
    return statusSteps.find((step) => step.order === (current?.order || 0) + 1);
  };

  const getPrevStatus = () => {
    const current = getCurrentStatusStep();
    return statusSteps.find((step) => step.order === (current?.order || 0) - 1);
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
            {/* Main Content - 2/3 width */}
            <div className="space-y-6 lg:col-span-2">
              {/* Lead Information with Tabs */}
              <Card className="p-6">
                <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                  Lead Information
                </h2>

                {/* Tab Navigation */}
                <div className="border-b border-gray-200 dark:border-gray-700">
                  <nav className="-mb-px flex space-x-8">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-2 border-b-2 px-1 py-4 text-sm font-medium ${
                            activeTab === tab.id
                              ? "border-primary-500 text-primary-600 dark:text-primary-400"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="mt-6">
                  {/* Contact Information Tab */}
                  {activeTab === "contact" && (
                    <div className="space-y-4">
                      {/* First Row: Name and Phone */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <IdentificationIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Customer Name
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.name}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <PhoneIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Phone Number
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Second Row: Email and Lead Source */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Email Address
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.email}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <TagIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Lead Source
                            </div>
                            <div className="font-medium text-gray-900 capitalize dark:text-white">
                              {lead.lead_source}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Third Row: Assigned Agent and Priority */}
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Assigned Agent
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.agent_assignment}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <StarIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Priority Level
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              <Badge
                                color={
                                  lead.priority === "high"
                                    ? "error"
                                    : lead.priority === "medium"
                                      ? "warning"
                                      : "info"
                                }
                                className="capitalize"
                              >
                                {lead.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Travel Details Tab */}
                  {activeTab === "travel" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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

                        <div className="flex items-center gap-3">
                          <FlagIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Departure City
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.departure_city}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Travel Date
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.travel_date}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <ClockIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Travel Time
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.travel_time}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Duration
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.days} Days
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <UserGroupIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Travelers
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.adults} Adults, {lead.children} Children
                            </div>
                            {lead.children > 0 && lead.children_age && (
                              <div className="text-sm text-gray-500">
                                Children Ages: {lead.children_age}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Travel Preferences */}
                      {lead.travel_preferences && (
                        <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                          <h4 className="mb-3 flex items-center gap-2 font-medium text-gray-800 dark:text-gray-200">
                            <HeartIcon className="h-5 w-5 text-gray-400" />
                            Travel Preferences
                          </h4>
                          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                            <p className="text-gray-700 dark:text-gray-300">
                              {lead.travel_preferences}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Business Information Tab */}
                  {activeTab === "business" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="flex items-center gap-3">
                          <CurrencyDollarIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Estimated Value
                            </div>
                            <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                              ${lead.estimated_value?.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <CalendarIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Expected Close Date
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {lead.expected_close_date}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <StarIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Priority Level
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              <Badge
                                color={
                                  lead.priority === "high"
                                    ? "error"
                                    : lead.priority === "medium"
                                      ? "warning"
                                      : "info"
                                }
                                className="capitalize"
                              >
                                {lead.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Lead Status
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              <Badge
                                color={getStatusColor(lead.status)}
                                className="capitalize"
                              >
                                {lead.status.replace("_", " ")}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Add Notes & Follow-up Section - Moved from sidebar */}
                <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
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
                </div>
              </Card>
            </div>

            {/* Lead Progress Sidebar - 1/3 width */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      LEAD PROGRESS
                    </h3>
                    <Button
                      size="sm"
                      color="error"
                      variant="outlined"
                      className="text-xs"
                      onClick={handleRemoveLead}
                    >
                      Remove Lead
                    </Button>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Simpler way to keep a track by adding relevant notes.
                  </p>

                  {/* Phone Number */}
                  <div className="flex items-center gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <PhoneIcon className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Ph. No.: {lead.phone}
                    </span>
                  </div>

                  {/* Current Status */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </h4>
                    <div className="mb-3 flex items-center gap-2">
                      <Badge
                        color={getStatusColor(lead.status)}
                        className="capitalize"
                      >
                        {lead.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <Button
                      size="sm"
                      color="primary"
                      className="mb-4 w-full"
                      onClick={() => setShowStatusUpdate(!showStatusUpdate)}
                    >
                      UPDATE STATUS
                    </Button>

                    {/* Status Update Dropdown */}
                    {showStatusUpdate && (
                      <div className="mb-4 space-y-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                        {statusSteps.map((step) => (
                          <Button
                            key={step.id}
                            size="sm"
                            variant={
                              lead.status === step.id ? "solid" : "outlined"
                            }
                            color={
                              lead.status === step.id ? "primary" : "neutral"
                            }
                            className="w-full text-xs"
                            onClick={() => handleStatusUpdate(step.id)}
                          >
                            {step.label}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Progress Steps */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        disabled={!getPrevStatus()}
                        onClick={() =>
                          getPrevStatus() &&
                          handleStatusUpdate(getPrevStatus().id)
                        }
                      >
                        Prev
                      </Button>
                      <Button
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        disabled={!getNextStatus()}
                        onClick={() =>
                          getNextStatus() &&
                          handleStatusUpdate(getNextStatus().id)
                        }
                      >
                        Next
                      </Button>
                    </div>

                    {/* Status Steps */}
                    <div className="space-y-4">
                      {statusSteps.map((step) => {
                        const isActive = lead.status === step.id;
                        const isCompleted =
                          statusSteps.find((s) => s.id === lead.status)?.order >
                          step.order;

                        return (
                          <div
                            key={step.id}
                            className={`rounded-lg border p-3 ${
                              isActive
                                ? "border-2 border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20"
                                : isCompleted
                                  ? "border-2 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                                  : "border border-gray-200 dark:border-gray-700"
                            }`}
                          >
                            <h5
                              className={`mb-2 font-medium ${
                                isActive
                                  ? "text-blue-900 dark:text-blue-100"
                                  : isCompleted
                                    ? "text-green-900 dark:text-green-100"
                                    : "text-gray-900 dark:text-white"
                              }`}
                            >
                              {step.label}
                            </h5>

                            {/* Show action buttons only for active "Contacting" status */}
                            {isActive && step.id === "contacting" && (
                              <div className="space-y-2">
                                <Button
                                  size="sm"
                                  variant="outlined"
                                  color="warning"
                                  className="w-full text-xs"
                                  onClick={() =>
                                    handleQuickAction("call_not_picked")
                                  }
                                >
                                  Call not picked? Mark unable to reach customer
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outlined"
                                  color="success"
                                  className="w-full text-xs"
                                  onClick={() =>
                                    handleQuickAction("share_whatsapp")
                                  }
                                >
                                  Share quote on Whatsapp? Click here to send
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outlined"
                                  color="info"
                                  className="w-full text-xs"
                                  onClick={() =>
                                    handleQuickAction("resend_quote")
                                  }
                                >
                                  Quote not seen? Resend quote & set a reminder
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outlined"
                                  color="primary"
                                  className="w-full text-xs"
                                  onClick={() =>
                                    handleQuickAction("set_reminder")
                                  }
                                >
                                  Talk in progress? Set reminder for when to
                                  call next
                                </Button>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
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
