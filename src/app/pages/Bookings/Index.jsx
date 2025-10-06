// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Badge, Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { Breadcrumbs } from "components/shared/Breadcrumbs";
import { DataTable } from "components/shared/DataTable";
import { ROUTES } from "app/router/routes";

// ----------------------------------------------------------------------

const breadcrumbItems = [
  { label: "Dashboard", href: ROUTES.DASHBOARD.HOME },
  { label: "Bookings" },
];

const getPaymentStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "paid":
      return "success";
    case "partial":
      return "warning";
    case "pending":
      return "info";
    case "overdue":
      return "error";
    default:
      return "neutral";
  }
};

const getBookingStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "error";
    case "completed":
      return "info";
    default:
      return "neutral";
  }
};

// Mock data - in real app this would come from props (Inertia.js)
const mockBookings = {
  data: [
    {
      id: 1,
      booking_number: "BK001",
      customer_name: "John Smith",
      destination: "Paris, France",
      travel_dates: "2024-06-15 to 2024-06-25",
      total_amount: 2100,
      payment_status: "partial",
      booking_status: "confirmed",
      created_at: "2024-01-15",
    },
    {
      id: 2,
      booking_number: "BK002",
      customer_name: "Emily Johnson",
      destination: "Tokyo, Japan",
      travel_dates: "2024-07-10 to 2024-07-20",
      total_amount: 3500,
      payment_status: "paid",
      booking_status: "confirmed",
      created_at: "2024-01-14",
    },
    {
      id: 3,
      booking_number: "BK003",
      customer_name: "Robert Davis",
      destination: "London, UK",
      travel_dates: "2024-05-20 to 2024-05-30",
      total_amount: 1800,
      payment_status: "pending",
      booking_status: "pending",
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

export default function BookingsIndex() {
  const [bookings] = useState(mockBookings);

  const columns = [
    {
      accessorKey: "booking_number",
      header: "Booking #",
      cell: ({ row }) => (
        <span className="text-primary-600 dark:text-primary-400 font-medium">
          {row.original.booking_number}
        </span>
      ),
    },
    {
      accessorKey: "customer_name",
      header: "Customer Name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">
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
      accessorKey: "travel_dates",
      header: "Travel Dates",
      cell: ({ row }) => (
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {row.original.travel_dates}
        </span>
      ),
    },
    {
      accessorKey: "total_amount",
      header: "Total Amount",
      cell: ({ row }) => (
        <span className="font-medium">
          ${row.original.total_amount.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "payment_status",
      header: "Payment Status",
      cell: ({ row }) => (
        <Badge
          color={getPaymentStatusColor(row.original.payment_status)}
          className="capitalize"
        >
          {row.original.payment_status}
        </Badge>
      ),
    },
    {
      accessorKey: "booking_status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          color={getBookingStatusColor(row.original.booking_status)}
          className="capitalize"
        >
          {row.original.booking_status}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
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
            to={ROUTES.BOOKINGS.SHOW(row.original.id)}
            size="sm"
            variant="soft"
            color="info"
            isIcon
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Page title="Bookings - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Bookings
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Manage confirmed travel bookings and operations
              </p>
            </div>
            <Button
              component={Link}
              to={ROUTES.BOOKINGS.CREATE}
              color="primary"
              className="shrink-0"
            >
              <PlusIcon className="mr-2 h-5 w-5" />
              New Booking
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card className="p-6">
              <div className="dark:text-dark-50 text-2xl font-bold text-gray-800">
                {bookings.meta.total}
              </div>
              <div className="dark:text-dark-200 text-sm text-gray-600">
                Total Bookings
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-success-600 dark:text-success-400 text-2xl font-bold">
                2
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Confirmed
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-warning-600 dark:text-warning-400 text-2xl font-bold">
                1
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Pending
              </div>
            </Card>
            <Card className="p-4">
              <div className="text-info-600 dark:text-info-400 text-2xl font-bold">
                $7,400
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Revenue
              </div>
            </Card>
          </div>

          {/* Bookings Table */}
          <Card className="overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                All Bookings
              </h2>
            </div>
            <DataTable
              data={bookings.data}
              columns={columns}
              pagination={{
                pageIndex: bookings.meta.current_page - 1,
                pageSize: bookings.meta.per_page,
                pageCount: bookings.meta.last_page,
              }}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
