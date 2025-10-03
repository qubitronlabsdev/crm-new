// Import Dependencies
import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  DocumentTextIcon,
  EyeIcon,
  PencilIcon,
  // FunnelIcon,
  // ArrowsUpDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card, Badge } from "components/ui";
import { Page } from "components/shared/Page";
import { DataTable } from "components/shared/DataTable";
import { TableTabs } from "components/ui/Table/TableTabs";
import tabs from "features/Quotations/consts/tabs";
import { mockQuotationsData } from "features/Quotations/data/mockQuotations";
import { ROUTES, generateRoute } from "app/router/routes";
import { getStatusBadgeColor } from "features/Quotations/lib/utils";

// ----------------------------------------------------------------------

export default function QuotationsIndex() {
  const [quotations, setQuotations] = useState({
    data: [],
    meta: {},
    links: {},
  });
  const [loading, setLoading] = useState(false);
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  // const [isSortOpen, setIsSortOpen] = useState(false);
  // const [filters, setFilters] = useState({
  //   status: "",
  //   customer_name: "",
  //   destination: "",
  // });
  // const [sort, setSort] = useState({
  //   field: "createdAt",
  //   order: "desc",
  // });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Initialize quotations data
  useEffect(() => {
    setLoading(true);
    // Simulate API response structure
    setQuotations({
      data: mockQuotationsData,
      meta: {
        total: mockQuotationsData.length,
        per_page: 10,
        current_page: 1,
        last_page: Math.ceil(mockQuotationsData.length / 10),
      },
      links: {},
    });
    setLoading(false);
  }, []);

  const handleDeleteQuotation = async (quotationId) => {
    if (confirm("Are you sure you want to delete this quotation?")) {
      try {
        // In real app: await quotationsApi.deleteQuotation(quotationId);
        console.log("Deleting quotation:", quotationId);
        // For now, just remove from local state
        setQuotations((prev) => ({
          ...prev,
          data: prev.data.filter((q) => q.id !== quotationId),
        }));
      } catch (error) {
        console.error("Error deleting quotation:", error);
      }
    }
  };

  const columns = [
    {
      accessorKey: "quoteId",
      header: "Quote ID",
      cell: ({ row }) => (
        <span className="text-primary-600 dark:text-primary-400 font-medium">
          {row.original.quoteId}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="max-w-xs truncate">
          <div className="dark:text-dark-50 font-medium text-gray-800">
            {row.original.title}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "customerName",
      header: "Customer",
      cell: ({ row }) => (
        <div>
          <div className="dark:text-dark-50 font-medium text-gray-800">
            {row.original.customerName}
          </div>
          <div className="dark:text-dark-300 text-sm text-gray-500">
            {row.original.customerEmail}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: "Destination",
    },
    {
      accessorKey: "totalCost",
      header: "Total Cost",
      cell: ({ row }) => (
        <div>
          <span className="dark:text-dark-50 font-medium text-gray-800">
            {row.original.currency} {row.original.totalCost.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          color={getStatusBadgeColor(row.original.status)}
          className="rounded-lg py-1.5 capitalize"
          variant="soft"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "validUntil",
      header: "Valid Until",
      cell: ({ row }) => (
        <span className="dark:text-dark-200 text-sm text-gray-500">
          {new Date(row.original.validUntil).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => (
        <span className="dark:text-dark-200 text-sm text-gray-500">
          {new Date(row.original.createdAt).toLocaleDateString()}
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
            to={generateRoute.quotationShow(row.original.id)}
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
            component={Link}
            to={generateRoute.quotationEdit(row.original.id)}
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
            color="error"
            isIcon
            title="Delete Quotation"
            className="shrink-0 p-1"
            onClick={() => handleDeleteQuotation(row.original.id)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];
  return (
    <Page title="Quotations - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Quotations Management
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Manage travel quotations and proposals
              </p>
            </div>
            <Button
              component={Link}
              to="/quotations/create"
              color="primary"
              className="shrink-0"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              Create Quotation
            </Button>
          </div>

          {/* Quotations Navigation Tabs */}
          <TableTabs tabs={tabs} />

          {/* Quotations Table */}
          <Card className="overflow-hidden">
            <div className="dark:border-dark-500 border-b border-gray-200 px-6 py-4">
              <div className="flex w-full items-center justify-between">
                <h2 className="dark:text-dark-50 text-lg font-semibold text-gray-800">
                  All Quotations ({quotations.meta.total || 0})
                </h2>
                {/* <div className="flex gap-3">
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
                </div> */}
              </div>
            </div>
            <DataTable
              data={quotations.data}
              columns={columns}
              loading={loading}
              // filters={filters}
              // sorting={sort}
              pagination={{
                pageIndex: pagination.pageIndex,
                pageSize: pagination.pageSize,
                pageCount: quotations.meta.last_page || 0,
              }}
              onPaginationChange={setPagination}
            />
          </Card>

          {/* Empty State */}
          {quotations.data.length === 0 && !loading && (
            <Card className="p-12 text-center">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No quotations found
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Get started by creating your first quotation
              </p>
              <Button
                component={Link}
                to={ROUTES.QUOTATIONS.CREATE}
                color="primary"
                className="mt-4"
              >
                <PlusIcon className="mr-2 h-5 w-5" />
                Create Quotation
              </Button>
            </Card>
          )}
        </div>
      </div>
    </Page>
  );
}
