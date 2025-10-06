// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button, Card, Badge } from "components/ui";
import { Page } from "components/shared/Page";
import { ROUTES } from "app/router/routes";
import { employeeApi } from "features/EmployeeManagement/lib/employeeUtils";

// ----------------------------------------------------------------------

export default function ShowEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load employee data based on ID
    if (id) {
      const loadEmployee = async () => {
        try {
          setIsLoading(true);
          const employeeData = await employeeApi.getEmployeeById(id);
          setEmployee(employeeData);
        } catch (error) {
          console.error("Error loading employee:", error);
        } finally {
          setIsLoading(false);
        }
      };

      loadEmployee();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Page title="Employee Details - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">
              Loading employee details...
            </div>
          </div>
        </div>
      </Page>
    );
  }

  if (!employee) {
    return (
      <Page title="Employee Not Found - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">
              Employee not found.
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title={`${employee.name} - Travel CRM`}>
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                component={Link}
                to={ROUTES.EMPLOYEES.ALL}
                variant="outlined"
                color="neutral"
                className="shrink-0 p-1"
                isIcon
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div className="min-w-0">
                <h1 className="dark:text-dark-50 mt-2 text-2xl font-bold tracking-wide text-gray-800">
                  {employee.name}
                </h1>
                <p className="dark:text-dark-200 text-gray-600">
                  Employee ID: {employee.employee_id}
                </p>
              </div>
            </div>
            <Button
              component={Link}
              to={ROUTES.EMPLOYEES.EDIT(id)}
              color="primary"
              leftIcon={<PencilIcon className="h-4 w-4" />}
            >
              Edit Employee
            </Button>
          </div>

          {/* Employee Details */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Personal Information */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Personal Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {employee.name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {employee.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {employee.phone}
                  </p>
                </div>
                {employee.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <p className="text-gray-900 dark:text-white">
                      {employee.address}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Employment Information */}
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Employment Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department
                  </label>
                  <p className="text-gray-900 capitalize dark:text-white">
                    {employee.department?.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Position
                  </label>
                  <p className="text-gray-900 capitalize dark:text-white">
                    {employee.position?.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hire Date
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(employee.hire_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Status
                  </label>
                  <div>
                    <Badge
                      color={
                        employee.status === "active" ? "success" : "neutral"
                      }
                      className="capitalize"
                      variant="soft"
                    >
                      {employee.status?.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Salary
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    ${employee.salary?.toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            {/* Additional Information */}
            {(employee.emergency_contact || employee.notes) && (
              <Card className="p-6 lg:col-span-2">
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Additional Information
                </h3>
                <div className="space-y-4">
                  {employee.emergency_contact && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Emergency Contact
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {employee.emergency_contact}
                      </p>
                    </div>
                  )}
                  {employee.notes && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Notes
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {employee.notes}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Page>
  );
}
