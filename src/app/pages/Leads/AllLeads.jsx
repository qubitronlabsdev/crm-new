// Import Dependencies
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  DocumentTextIcon,
  TrashIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { DataTable } from "components/shared/DataTable";
import { LeadTabs } from "features/Leads/components/LeadTabs";
import { LeadFilterDialog } from "features/Leads/components/LeadFilterDialog";
import { LeadSortDialog } from "features/Leads/components/LeadSortDialog";
import { leadsApi } from "utils/leadsApi";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { title: "Dashboard", path: "/" },
  { title: "Leads", path: "/leads/all" },
  { title: "All Leads" },
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

// ----------------------------------------------------------------------

export default function AllLeads() {
  const [leads, setLeads] = useState({ data: [], meta: {}, links: {} });

  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [filters, setFilters] = useState({
    lead_source: "",
    agent_assigned: "",
    destination: "",
  });
  const [sort, setSort] = useState({
    field: "created_at",
    order: "desc",
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch leads data
  const fetchLeads = async () => {
    try {
      setLoading(true);
      const [leadsResponse] = await Promise.all([
        leadsApi.getLeads({
          page: pagination.pageIndex + 1,
          per_page: pagination.pageSize,
          filters,
          sort,
        }),
        leadsApi.getLeadStats(),
      ]);
      setLeads(leadsResponse);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, pagination]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPagination((prev) => ({ ...prev, pageIndex: 0 })); // Reset to first page
  };

  const handleDeleteLead = async (leadId) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await leadsApi.deleteLead(leadId);
        fetchLeads(); // Refresh the list
      } catch (error) {
        console.error("Error deleting lead:", error);
      }
    }
  };

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
      accessorKey: "created_at",
      header: "Created At",
      cell: ({ row }) => (
        <span className="dark:text-dark-200 text-sm text-gray-500">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "updated_at",
      header: "Updated At",
      cell: ({ row }) => (
        <span className="dark:text-dark-200 text-sm text-gray-500">
          {new Date(row.original.updated_at).toLocaleDateString()}
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
          className="rounded-lg py-1.5 capitalize"
          variant="soft"
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
          className="rounded-lg py-1.5 capitalize"
          variant="soft"
        >
          {row.original.priority}
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
            to={`/quotations/create?leadId=${row.original.id}`}
            size="sm"
            variant="soft"
            color="success"
            isIcon
            title="Give Quotation"
            className="shrink-0 p-1"
          >
            <DocumentTextIcon className="h-4 w-4" />
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
            to={`/leads/${row.original.id}`}
            size="sm"
            variant="soft"
            color="info"
            isIcon
            title="View Details"
            className="shrink-0 p-1"
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="soft"
            color="error"
            isIcon
            title="Delete Lead"
            className="shrink-0 p-1"
            onClick={() => handleDeleteLead(row.original.id)}
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

          {/* Leads Table */}
          <Card className="overflow-hidden">
            <div className="dark:border-dark-500 border-b border-gray-200 px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <h2 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
                  All Leads ({leads.meta.total || 0})
                </h2>
                <div className="flex gap-3">
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setIsFilterOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <FunnelIcon className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button
                    variant="outlined"
                    color="neutral"
                    onClick={() => setIsSortOpen(true)}
                    className="flex items-center gap-2"
                  >
                    <ArrowsUpDownIcon className="h-4 w-4" />
                    Sort
                  </Button>
                </div>
              </div>
            </div>
            <DataTable
              data={leads.data}
              columns={columns}
              loading={loading}
              filters={filters}
              sorting={sort}
              pagination={{
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                pageCount: leads.meta.last_page || 0,
              }}
              onPaginationChange={setPagination}
            />
          </Card>
        </div>

        {/* Filter Dialog */}
        <LeadFilterDialog
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Sort Dialog */}
        <LeadSortDialog
          isOpen={isSortOpen}
          onClose={() => setIsSortOpen(false)}
          sort={sort}
          onSortChange={handleSortChange}
        />
      </div>
    </Page>
  );
}
