// Import Dependencies
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { PlusIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { DataTable } from "components/shared/DataTable";
import { getLeadsFromStorage } from "utils/leadsUtils";

// ----------------------------------------------------------------------

const breadcrumbItems = [{ label: "Dashboard", href: "/" }, { label: "Leads" }];

const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "fresh":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    case "contacted":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300";
    case "qualified":
      return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
    case "proposal_sent":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "negotiation":
      return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300";
    case "closed_won":
      return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300";
    case "closed_lost":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
    // Legacy status mapping
    case "new":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
    case "in_progress":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
    case "postponed":
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    case "lost":
      return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
  }
};

// ----------------------------------------------------------------------

export default function LeadsIndex() {
  const [leads, setLeads] = useState({
    data: [],
    links: {
      first: "/?page=1",
      last: "/?page=1",
      prev: null,
      next: null,
    },
    meta: {
      current_page: 1,
      from: 0,
      last_page: 1,
      per_page: 15,
      to: 0,
      total: 0,
    },
  });

  // Load leads from localStorage on component mount
  useEffect(() => {
    const loadLeads = () => {
      const savedLeads = getLeadsFromStorage();
      if (savedLeads) {
        setLeads(savedLeads);
      }
      // No else clause - start with empty data if no leads exist
    };

    // Load leads initially
    loadLeads();

    // Refresh leads when window gains focus (user returns from create page)
    const handleFocus = () => {
      loadLeads();
    };

    window.addEventListener("focus", handleFocus);

    // Cleanup event listener
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Calculate dynamic statistics
  const getLeadStats = () => {
    const data = leads.data || [];
    const total = data.length;
    const qualified = data.filter(
      (lead) => lead.status?.toLowerCase() === "qualified",
    ).length;
    const inProgress = data.filter(
      (lead) => lead.status?.toLowerCase() === "in_progress",
    ).length;
    const newLeads = data.filter(
      (lead) =>
        lead.status?.toLowerCase() === "new" ||
        lead.status?.toLowerCase() === "fresh",
    ).length;

    return { total, qualified, inProgress, newLeads };
  };

  const stats = getLeadStats();

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
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusStyle(row.original.status)}`}
        >
          {row.original.status.replace("_", " ")}
        </span>
      ),
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => {
        const budget = Number(row.original.budget) || 0;
        return <span className="font-medium">₹{budget.toLocaleString()}</span>;
      },
    },
    {
      accessorKey: "assigned_agent",
      header: "Assigned Agent",
      cell: ({ row }) => {
        const agent = row.original.assigned_agent;
        // Convert agent codes to readable names
        const agentNames = {
          john_doe: "John Doe",
          jane_smith: "Jane Smith",
          mike_johnson: "Mike Johnson",
          sarah_wilson: "Sarah Wilson",
          david_brown: "David Brown",
          unassigned: "Unassigned",
        };
        return (
          <span className="text-gray-700 dark:text-gray-300">
            {agentNames[agent] || agent}
          </span>
        );
      },
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
            className="shrink-0 p-1"
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
                {stats.total}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Total Leads
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-success-600 dark:text-success-400 text-2xl font-bold">
                {stats.qualified}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Qualified
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-warning-600 dark:text-warning-400 text-2xl font-bold">
                {stats.inProgress}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                In Progress
              </div>
            </Card>
            <Card className="p-6">
              <div className="text-info-600 dark:text-info-400 text-2xl font-bold">
                {stats.newLeads}
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
