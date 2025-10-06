// Import Dependencies
import { useState } from "react";
import { Link } from "react-router";
import {
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
} from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card } from "components/ui";
import { Page } from "components/shared/Page";
import { DataTable } from "components/shared/DataTable";
import { ROUTES } from "app/router/routes";
import { mockEmployees } from "../data/mockEmployees";

export function EmployeeTable() {
  const [employees] = useState(mockEmployees);
  const [loading] = useState(false);

  const columns = [
    {
      accessorKey: "employee_id",
      header: "Employee ID",
      cell: ({ row }) => (
        <span className="text-primary-600 dark:text-primary-400 font-medium">
          {row.original.employee_id}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: "Employee Name",
      cell: ({ row }) => (
        <div>
          <div className="dark:text-dark-50 font-medium text-gray-800">
            {row.original.name}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {row.original.email}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "total_leads",
      header: "Total Lead",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {row.original.total_leads}
        </span>
      ),
    },
    {
      accessorKey: "active_leads",
      header: "Active Lead",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-green-600 dark:text-green-400">
          {row.original.active_leads}
        </span>
      ),
    },
    {
      accessorKey: "process_leads",
      header: "Process Lead",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
          {row.original.process_leads}
        </span>
      ),
    },
    {
      accessorKey: "hot_leads",
      header: "Hot Lead",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-red-600 dark:text-red-400">
          {row.original.hot_leads}
        </span>
      ),
    },
    {
      accessorKey: "converted_leads",
      header: "Converted",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
          {row.original.converted_leads}
        </span>
      ),
    },
    {
      accessorKey: "cancelled_leads",
      header: "Cancel Lead",
      cell: ({ row }) => (
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {row.original.cancelled_leads}
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
            to={ROUTES.EMPLOYEES.SHOW(row.original.id)}
            variant="soft"
            color="info"
            size="sm"
            isIcon
            title="View Employee"
            className="p-1"
          >
            <EyeIcon className="h-4 w-4" />
          </Button>
          <Button
            component={Link}
            to={ROUTES.EMPLOYEES.EDIT(row.original.id)}
            variant="soft"
            color="warning"
            size="sm"
            isIcon
            title="Edit Employee"
            className="p-1"
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="soft"
            size="sm"
            isIcon
            color="error"
            title="Delete Employee"
            className="p-1"
            onClick={() => {
              if (confirm("Are you sure you want to delete this employee?")) {
                console.log("Delete employee:", row.original.id);
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
    <Page title="Employees - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                Employee Management
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Manage your team members and their information
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
                to={ROUTES.EMPLOYEES.CREATE}
                color="primary"
                leftIcon={<PlusIcon className="h-4 w-4" />}
              >
                Add Employee
              </Button>
            </div>
          </div>

          {/* Employee Table */}
          <Card className="overflow-hidden">
            <DataTable
              data={employees.data}
              columns={columns}
              loading={loading}
              pagination={{
                pageIndex: 0,
                pageSize: 10,
              }}
              meta={employees.meta}
            />
          </Card>
        </div>
      </div>
    </Page>
  );
}
