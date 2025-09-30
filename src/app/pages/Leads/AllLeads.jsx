// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  DocumentTextIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { DataTable } from "components/shared/DataTable";
import { LeadTabs } from "components/shared/LeadTabs";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: "/" },
  { label: "Leads", href: "/leads/all" },
  { label: "All Leads" },
];

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "fresh":
      return "info";
    case "converted":
      return "success";
    case "postponed":
      return "warning";
    default:
      return "neutral";
  }
};

// Mock data - in real app this would come from API
const mockLeads = {
  data: [
    {
      id: 1,
      customer_name: "John Smith",
      destination: "Paris, France",
      lead_status: "fresh",
      travel_date: "2024-06-15",
      source: "Website",
      agent_assigned: "Sarah Wilson",
      created_agent: "Admin",
      priority: "medium",
      created_at: "2024-01-15",
      updated_at: "2024-01-15",
    },
    {
      id: 2,
      customer_name: "Emily Johnson",
      destination: "Tokyo, Japan",
      lead_status: "converted",
      travel_date: "2024-07-10",
      source: "Email",
      agent_assigned: "Mike Chen",
      created_agent: "Admin",
      priority: "high",
      created_at: "2024-01-14",
      updated_at: "2024-01-16",
    },
    {
      id: 3,
      customer_name: "Robert Davis",
      destination: "London, UK",
      lead_status: "postponed",
      travel_date: "2024-05-20",
      source: "Phone",
      agent_assigned: "Jessica Brown",
      created_agent: "Admin",
      priority: "low",
      created_at: "2024-01-13",
      updated_at: "2024-01-14",
    },
  ],
  links: {
    first: "/?page=1",
    last: "/?page=1",
    prev: null,
    next: null,
  },
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 15,
    to: 3,
    total: 3,
  },
};

// ----------------------------------------------------------------------

export default function AllLeads() {
  const [leads] = useState(mockLeads);

  // Calculate stats
  // const freshCount = leads.data.filter(
  //   (lead) => lead.lead_status === "fresh",
  // ).length;
  // const convertedCount = leads.data.filter(
  //   (lead) => lead.lead_status === "converted",
  // ).length;
  // const postponedCount = leads.data.filter(
  //   (lead) => lead.lead_status === "postponed",
  // ).length;

  const columns = [
    {
      accessorKey: "id",
      header: "Lead ID",
      cell: ({ row }) => (
        <span className="text-primary-600 dark:text-primary-400 font-medium">
          #{row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      cell: ({ row }) => (
        <div>
          <div className="dark:text-dark-50 font-medium text-gray-800">
            {row.original.customer_name}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "travel_date",
      header: "Travel Date",
      cell: ({ row }) => (
        <span className="text-sm">
          {new Date(row.original.travel_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "source",
      header: "Source",
    },
    {
      accessorKey: "lead_status",
      header: "Lead Status",
      cell: ({ row }) => (
        <Badge
          color={getStatusColor(row.original.lead_status)}
          className="capitalize"
        >
          {row.original.lead_status}
        </Badge>
      ),
    },
    {
      accessorKey: "agent_assigned",
      header: "Assigned Agent",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <Badge
          color={
            row.original.priority === "urgent"
              ? "error"
              : row.original.priority === "high"
                ? "warning"
                : row.original.priority === "medium"
                  ? "info"
                  : "neutral"
          }
          className="capitalize"
        >
          {row.original.priority}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-1">
          <Button
            component={Link}
            to={`/quotations/create?leadId=${row.original.id}`}
            size="sm"
            variant="soft"
            color="success"
            isIcon
            title="Give Quotation"
          >
            <DocumentTextIcon className="h-4 w-4" />
          </Button>
          <Button
            component={Link}
            to={`/leads/${row.original.id}/edit`}
            size="sm"
            variant="soft"
            color="warning"
            isIcon
            title="Edit Lead"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            component={Link}
            to={`/leads/${row.original.id}`}
            size="sm"
            variant="soft"
            color="info"
            isIcon
            title="View Details"
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="error"
            isIcon
            title="Delete Lead"
            onClick={() => {
              if (confirm("Are you sure you want to delete this lead?")) {
                // Handle delete
                console.log("Delete lead:", row.original.id);
              }
            }}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="All Leads - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                All Leads
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                View and manage all leads regardless of their status
              </p>
            </div>
            <Button
              component={Link}
              to="/leads/create"
              color="primary"
              className="shrink-0"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Create New Lead
            </Button>
          </div>

          {/* Lead Navigation Tabs */}
          <LeadTabs />

          {/* Statistics Cards */}
          {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="p-6">
              <div className="dark:text-dark-50 text-2xl font-bold text-gray-800">
                {leads.meta.total}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Total Leads
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-info-600 dark:text-info-400 text-2xl font-bold">
                {freshCount}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Fresh Leads
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-success-600 dark:text-success-400 text-2xl font-bold">
                {convertedCount}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Converted Leads
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-warning-600 dark:text-warning-400 text-2xl font-bold">
                {postponedCount}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Postponed Leads
              </div>
            </Card>
          </div> */}

          {/* Filter and Sort Options */}
          <Card className="p-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label className="dark:text-dark-200 mb-1 text-sm font-medium text-gray-700">
                  Filter by Lead Source
                </label>
                <select className="dark:border-dark-500 dark:bg-dark-700 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                  <option value="">All Sources</option>
                  <option value="website">Website</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="referral">Referral</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="dark:text-dark-200 mb-1 text-sm font-medium text-gray-700">
                  Filter by Agent Assigned
                </label>
                <select className="dark:border-dark-500 dark:bg-dark-700 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                  <option value="">All Agents</option>
                  <option value="sarah">Sarah Wilson</option>
                  <option value="mike">Mike Chen</option>
                  <option value="jessica">Jessica Brown</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="dark:text-dark-200 mb-1 text-sm font-medium text-gray-700">
                  Filter by Destination
                </label>
                <select className="dark:border-dark-500 dark:bg-dark-700 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                  <option value="">All Destinations</option>
                  <option value="paris">Paris, France</option>
                  <option value="tokyo">Tokyo, Japan</option>
                  <option value="london">London, UK</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="dark:text-dark-200 mb-1 text-sm font-medium text-gray-700">
                  Sort by
                </label>
                <select className="dark:border-dark-500 dark:bg-dark-700 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm">
                  <option value="created_at">Created Date</option>
                  <option value="updated_at">Updated Date</option>
                  <option value="priority">Priority</option>
                  <option value="travel_date">Travel Date</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Leads Table */}
          <Card className="overflow-hidden">
            <div className="dark:border-dark-500 border-b border-gray-200 px-6 py-4">
              <h2 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
                All Leads ({leads.meta.total})
              </h2>
            </div>
            <DataTable
              data={leads.data}
              columns={columns}
              pagination={{
                pageIndex: leads.meta.current_page - 1,
                pageSize: 10,
                pageCount: leads.meta.last_page,
              }}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
