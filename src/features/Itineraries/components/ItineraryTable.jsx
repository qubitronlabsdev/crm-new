// Import Dependencies
import { useState } from "react";
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
import { DataTable } from "components/shared/DataTable";
import { ROUTES } from "app/router/routes";

// ----------------------------------------------------------------------

// Mock itinerary data
const mockItineraries = {
  data: [
    {
      id: 1,
      title: "Romantic Paris Getaway",
      customer_name: "John & Jane Smith",
      customer_email: "john.smith@email.com",
      destination: "Paris, France",
      start_date: "2024-02-14",
      end_date: "2024-02-21",
      duration_days: 7,
      total_cost: 3500,
      status: "confirmed",
      priority: "high",
      agent_assigned: "jane_doe",
      departure_city: "New York",
      created_at: "2024-01-15",
    },
    {
      id: 2,
      title: "Mediterranean Cruise",
      customer_name: "Alice Johnson",
      customer_email: "alice.johnson@email.com",
      destination: "Mediterranean Sea",
      start_date: "2024-03-10",
      end_date: "2024-03-20",
      duration_days: 10,
      total_cost: 2800,
      status: "pending",
      priority: "medium",
      agent_assigned: "mike_wilson",
      departure_city: "Miami",
      created_at: "2024-01-20",
    },
    {
      id: 3,
      title: "Tokyo Adventure",
      customer_name: "David Brown",
      customer_email: "david.brown@email.com",
      destination: "Tokyo, Japan",
      start_date: "2024-04-05",
      end_date: "2024-04-15",
      duration_days: 10,
      total_cost: 4200,
      status: "draft",
      priority: "low",
      agent_assigned: "sarah_davis",
      departure_city: "Los Angeles",
      created_at: "2024-01-25",
    },
    {
      id: 4,
      title: "Safari Experience",
      customer_name: "Emma Wilson",
      customer_email: "emma.wilson@email.com",
      destination: "Kenya & Tanzania",
      start_date: "2024-05-20",
      end_date: "2024-06-02",
      duration_days: 13,
      total_cost: 5500,
      status: "confirmed",
      priority: "high",
      agent_assigned: "john_doe",
      departure_city: "London",
      created_at: "2024-02-01",
    },
  ],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 4,
  },
};

// Status color mapping
const getStatusColor = (status) => {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "draft":
      return "neutral";
    case "cancelled":
      return "error";
    case "completed":
      return "info";
    default:
      return "neutral";
  }
};

// Priority color mapping
const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";
    case "urgent":
      return "error";
    default:
      return "neutral";
  }
};

// ----------------------------------------------------------------------

export function ItineraryTable() {
  const [itineraries] = useState(mockItineraries);
  const [loading] = useState(false);

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="text-primary-600 dark:text-primary-400 font-medium">
          #{row.original.id.toString().padStart(3, "0")}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: "Itinerary Title",
      cell: ({ row }) => (
        <div>
          <div className="dark:text-dark-50 font-medium text-gray-800">
            {row.original.title}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.customer_name}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "destination",
      header: "Destination",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.destination}</span>
      ),
    },
    {
      accessorKey: "start_date",
      header: "Travel Dates",
      cell: ({ row }) => (
        <div className="text-sm">
          <div>{new Date(row.original.start_date).toLocaleDateString()}</div>
          <div className="text-gray-500 dark:text-gray-400">
            to {new Date(row.original.end_date).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "duration_days",
      header: "Duration",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.duration_days} days</span>
      ),
    },
    {
      accessorKey: "total_cost",
      header: "Total Cost",
      cell: ({ row }) => (
        <span className="text-sm font-medium">
          ${row.original.total_cost.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge
          color={getStatusColor(row.original.status)}
          className="rounded-lg py-1.5 capitalize"
          variant="soft"
        >
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <Badge
          color={getPriorityColor(row.original.priority)}
          className="rounded-lg py-1.5 capitalize"
          variant="soft"
        >
          {row.original.priority}
        </Badge>
      ),
    },
    {
      accessorKey: "agent_assigned",
      header: "Assigned Agent",
      cell: ({ row }) => (
        <span className="text-sm capitalize">
          {row.original.agent_assigned.replace("_", " ")}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            component={Link}
            to={ROUTES.ITINERARIES.SHOW(row.original.id)}
            variant="ghost"
            size="sm"
            isIcon
            title="View Itinerary"
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            component={Link}
            to={ROUTES.ITINERARIES.EDIT(row.original.id)}
            variant="ghost"
            size="sm"
            isIcon
            title="Edit Itinerary"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            isIcon
            title="Generate Document"
            onClick={() => {
              console.log("Generate document for itinerary:", row.original.id);
            }}
          >
            <DocumentTextIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            isIcon
            color="error"
            title="Delete Itinerary"
            onClick={() => {
              if (confirm("Are you sure you want to delete this itinerary?")) {
                console.log("Delete itinerary:", row.original.id);
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
    <Page title="Itineraries - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Travel Itineraries
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Manage and track customer travel itineraries
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <Button
                variant="outlined"
                color="neutral"
                leftIcon={<FunnelIcon className="h-4 w-4" />}
              >
                Filter
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                leftIcon={<ArrowsUpDownIcon className="h-4 w-4" />}
              >
                Sort
              </Button>
              <Button
                component={Link}
                to={ROUTES.ITINERARIES.CREATE}
                color="primary"
                leftIcon={<PlusIcon className="h-4 w-4" />}
              >
                Create Itinerary
              </Button>
            </div>
          </div>

          {/* Itinerary Table */}
          <Card className="overflow-hidden">
            <DataTable
              data={itineraries.data}
              columns={columns}
              loading={loading}
              pagination={{
                pageIndex: 0,
                pageSize: 10,
              }}
              meta={itineraries.meta}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
