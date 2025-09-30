// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import { PlusIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { DataTable } from "components/shared/DataTable";

// ----------------------------------------------------------------------

const breadcrumbItems = [{ label: "Dashboard", href: "/" }, { label: "Leads" }];

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

// Mock data - in real app this would come from props (Inertia.js)
const mockLeads = {
  data: [
    {
      id: 1,
      customer_name: "John Smith",
      destination: "Paris, France",
      status: "new",
      budget: 5000,
      travel_dates: "2024-06-15 to 2024-06-25",
      assigned_agent: "Sarah Wilson",
      created_at: "2024-01-15",
    },
    {
      id: 2,
      customer_name: "Emily Johnson",
      destination: "Tokyo, Japan",
      status: "qualified",
      budget: 8000,
      travel_dates: "2024-07-10 to 2024-07-20",
      assigned_agent: "Mike Chen",
      created_at: "2024-01-14",
    },
    {
      id: 3,
      customer_name: "Robert Davis",
      destination: "London, UK",
      status: "in_progress",
      budget: 3500,
      travel_dates: "2024-05-20 to 2024-05-30",
      assigned_agent: "Jessica Brown",
      created_at: "2024-01-13",
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

export default function LeadsIndex() {
  const [leads] = useState(mockLeads);

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
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          color={getStatusColor(row.original.status)}
          className="capitalize"
        >
          {row.original.status.replace("_", " ")}
        </Badge>
      ),
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => (
        <span className="font-medium">
          ${row.original.budget.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "assigned_agent",
      header: "Assigned Agent",
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <span className="dark:text-dark-200 text-sm text-gray-500">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            component={Link}
            to={`/leads/${row.original.id}`}
            size="sm"
            variant="soft"
            color="info"
            isIcon
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            component={Link}
            to={`/leads/${row.original.id}/edit`}
            size="sm"
            variant="soft"
            color="warning"
            isIcon
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="Leads - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Leads
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Manage and track potential customer inquiries
              </p>
            </div>
            <Button
              component={Link}
              to="/leads/create"
              color="primary"
              className="shrink-0"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Add Lead
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="p-6">
              <div className="dark:text-dark-50 text-2xl font-bold text-gray-800">
                {leads.meta.total}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Total Leads
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-success-600 dark:text-success-400 text-2xl font-bold">
                1
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Qualified
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-warning-600 dark:text-warning-400 text-2xl font-bold">
                1
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                In Progress
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-info-600 dark:text-info-400 text-2xl font-bold">
                1
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                New Leads
              </div>
            </Card>
          </div>

          {/* Leads Table */}
          <Card className="overflow-hidden">
            <div className="dark:border-dark-500 border-b border-gray-200 px-6 py-4">
              <h2 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
                All Leads
              </h2>
            </div>
            <DataTable
              data={leads.data}
              columns={columns}
              pagination={{
                pageIndex: leads.meta.current_page - 1,
                pageSize: 5,
                pageCount: leads.meta.last_page,
              }}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
