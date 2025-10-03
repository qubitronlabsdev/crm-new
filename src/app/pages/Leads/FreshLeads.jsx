// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { DataTable } from "components/shared/DataTable";
import { TableTabs } from "components/ui/Table/TableTabs";
import tabs from "features/Leads/constants/tabs";

// ----------------------------------------------------------------------



// Mock data - only fresh leads
const mockFreshLeads = {
  data: [
    {
      id: 1,
      customer_name: "John Smith",
      lead_id: "LD001",
      destination: "Paris, France",
      travel_date: "2024-06-15",
      source: "Website",
      lead_status: "fresh",
      created_at: "2024-01-15",
    },
    {
      id: 4,
      customer_name: "Alice Brown",
      lead_id: "LD004",
      destination: "Rome, Italy",
      travel_date: "2024-08-10",
      source: "Social Media",
      lead_status: "fresh",
      created_at: "2024-01-16",
    },
    {
      id: 5,
      customer_name: "David Wilson",
      lead_id: "LD005",
      destination: "Barcelona, Spain",
      travel_date: "2024-09-05",
      source: "Email",
      lead_status: "fresh",
      created_at: "2024-01-17",
    },
  ],
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

export default function FreshLeads() {
  const [leads] = useState(mockFreshLeads);

  const columns = [
    {
      accessorKey: "id",
      header: "S.No.",
      cell: ({ row, table }) => (
        <span className="font-medium">
          {table.getSortedRowModel().rows.indexOf(row) + 1}
        </span>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <div className="dark:text-dark-50 font-medium text-gray-800">
            {row.original.customer_name}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "lead_id",
      header: "Lead ID",
      cell: ({ row }) => (
        <span className="text-primary-600 dark:text-primary-400 font-medium">
          {row.original.lead_id}
        </span>
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
          color="info"
          className="rounded-lg py-1.5 capitalize"
          variant="soft"
        >
          {row.original.lead_status}
        </Badge>
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
            title="View Lead"
            className="shrink-0 p-1"
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            component={Link}
            to={`/leads/edit/${row.original.id}`}
            size="sm"
            variant="soft"
            color="warning"
            isIcon
            title="Edit Lead"
            className="shrink-0 p-1"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            component={Link}
            to={`/quotations/create?leadId=${row.original.id}`}
            size="sm"
            variant="soft"
            color="success"
            isIcon
            title="Create Quotation"
            className="shrink-0 p-1"
          >
            <DocumentTextIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="Fresh Leads - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Fresh Leads
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                New leads waiting for processing and quotation assignment
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
          <TableTabs tabs={tabs} />

          {/* Fresh Leads Table */}
          <Card className="overflow-hidden">
            <div className="dark:border-dark-500 border-b border-gray-200 px-6 py-4">
              <h2 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
                Fresh Leads ({leads.meta.total})
              </h2>
              <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
                Leads with status &apos;fresh&apos; - ready for quotation
                assignment
              </p>
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
