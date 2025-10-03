// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { DataTable } from "components/shared/DataTable";
import { LeadTabs } from "features/Leads/components/LeadTabs";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { title: "Dashboard", path: "/" },
  { title: "Leads", path: "/leads/all" },
  { title: "Converted Leads" },
];

// Mock data - only converted leads
const mockConvertedLeads = {
  data: [
    {
      id: 2,
      customer_name: "Emily Johnson",
      lead_id: "LD002",
      destination: "Tokyo, Japan",
      travel_date: "2024-07-10",
      source: "Email",
      lead_status: "converted",
      quotation_id: "QT002",
      created_at: "2024-01-14",
    },
    {
      id: 6,
      customer_name: "Sarah Connor",
      lead_id: "LD006",
      destination: "New York, USA",
      travel_date: "2024-10-15",
      source: "Referral",
      lead_status: "converted",
      quotation_id: "QT006",
      created_at: "2024-01-18",
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

export default function ConvertedLeads() {
  const [leads] = useState(mockConvertedLeads);

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
          color="success"
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
            to={`/quotations/edit/${row.original.quotation_id}`}
            size="sm"
            variant="soft"
            color="warning"
            isIcon
            title="Edit Quotation"
            className="shrink-0 p-1"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="success"
            isIcon
            title="Download Quotation PDF"
            className="shrink-0 p-1"
            onClick={() => {
              // Handle PDF download
              console.log(
                "Download PDF for quotation:",
                row.original.quotation_id,
              );
            }}
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="Converted Leads - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Converted Leads
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Leads that have been successfully converted with quotations
                assigned
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

          {/* Converted Leads Table */}
          <Card className="overflow-hidden">
            <div className="dark:border-dark-500 border-b border-gray-200 px-6 py-4">
              <h2 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
                Converted Leads ({leads.meta.total})
              </h2>
              <p className="dark:text-dark-300 mt-1 text-sm text-gray-500">
                Leads that have quotations assigned and are converted from fresh
                status
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
