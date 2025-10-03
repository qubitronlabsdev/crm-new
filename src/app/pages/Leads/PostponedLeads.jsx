// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { DataTable } from "components/shared/DataTable";
import { LeadTabs } from "features/Leads/components/LeadTabs";


// Mock data - only postponed leads
const mockPostponedLeads = {
  data: [
    {
      id: 3,
      customer_name: "Robert Davis",
      lead_id: "LD003",
      destination: "London, UK",
      travel_date: "2024-05-20",
      source: "Phone",
      lead_status: "postponed",
      follow_up_date: "2024-02-15",
      follow_up_time: "10:00",
      created_at: "2024-01-13",
    },
    {
      id: 7,
      customer_name: "Michael Scott",
      lead_id: "LD007",
      destination: "Sydney, Australia",
      travel_date: "2024-11-20",
      source: "Website",
      lead_status: "postponed",
      follow_up_date: "2024-02-20",
      follow_up_time: "14:30",
      created_at: "2024-01-19",
    },
  ],
  meta: {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 15,
    to: 2,
    total: 2,
  },
};

// ----------------------------------------------------------------------

export default function PostponedLeads() {
  const [leads] = useState(mockPostponedLeads);

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
          color="warning"
          className="rounded-lg py-1.5 capitalize"
          variant="soft"
        >
          {row.original.lead_status}
        </Badge>
      ),
    },
    {
      accessorKey: "follow_up",
      header: "Follow Up",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="dark:text-dark-50 font-medium text-gray-800">
            {new Date(row.original.follow_up_date).toLocaleDateString()}
          </div>
          <div className="dark:text-dark-200 text-gray-500">
            {row.original.follow_up_time}
          </div>
        </div>
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
            to={`/leads/${row.original.id}/edit`}
            size="sm"
            variant="soft"
            color="warning"
            isIcon
            title="Edit Lead (with follow-up)"
            className="shrink-0 p-1"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="Postponed Leads - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Postponed Leads
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Leads that have been postponed and scheduled for follow-up
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

          {/* Quick Follow-up Actions */}
          <Card className="p-6">
            <h3 className="dark:text-dark-50 mb-4 text-lg font-semibold text-gray-800">
              Quick Actions
            </h3>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="soft"
                color="info"
                onClick={() => {
                  // Filter leads with follow-up today
                  console.log("Show leads with follow-up today");
                }}
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                Today&apos;s Follow-ups
              </Button>
              <Button
                variant="soft"
                color="warning"
                onClick={() => {
                  // Filter overdue follow-ups
                  console.log("Show overdue follow-ups");
                }}
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                Overdue Follow-ups
              </Button>
              <Button
                variant="soft"
                color="success"
                onClick={() => {
                  // Filter upcoming follow-ups
                  console.log("Show upcoming follow-ups");
                }}
              >
                <ClockIcon className="mr-2 h-4 w-4" />
                Upcoming Follow-ups
              </Button>
            </div>
          </Card>

          {/* Postponed Leads Table */}
          <Card className="overflow-hidden">
            <div className="dark:border-dark-500 border-b border-gray-200 px-6 py-4">
              <h2 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
                Postponed Leads ({leads.meta.total})
              </h2>
              <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
                Leads with follow-up dates and times scheduled
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
