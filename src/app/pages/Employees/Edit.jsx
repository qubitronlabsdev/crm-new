// Import Dependencies
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { Page } from "components/shared/Page";
import { EmployeeForm } from "features/EmployeeManagement/components/EmployeeForm";
import { ROUTES } from "app/router/routes";
import {
  employeeApi,
  transformEmployeeToFormData,
} from "features/EmployeeManagement/lib/employeeUtils";

// ----------------------------------------------------------------------

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    // Load employee data based on ID
    if (id) {
      console.log("Loading employee with ID:", id);
      const loadEmployee = async () => {
        try {
          setIsPageLoading(true);
          const employeeData = await employeeApi.getEmployeeById(id);
          console.log("Found employee data:", employeeData);
          if (employeeData) {
            // Transform employee data to form format and set it
            const formData = transformEmployeeToFormData(employeeData);
            console.log("Transformed form data:", formData);
            setEmployee(formData);
          } else {
            console.error(`Employee with ID ${id} not found`);
            // Optionally redirect to employees list or show error
            navigate(ROUTES.EMPLOYEES.ALL);
          }
        } catch (error) {
          console.error("Error loading employee:", error);
          navigate(ROUTES.EMPLOYEES.ALL);
        } finally {
          setIsPageLoading(false);
        }
      };

      loadEmployee();
    }
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    setIsLoading(true);

    try {
      // Update employee via API
      await employeeApi.updateEmployee(id, data);

      console.log("Updating employee with data:", data);

      // Redirect to employees list after successful update
      navigate(ROUTES.EMPLOYEES.ALL);
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <Page title="Edit Employee - Travel CRM">
        <div className="transition-content w-full px-(--margin-x) pt-5 lg:pt-6">
          <div className="flex h-64 items-center justify-center">
            <div className="dark:text-dark-200 text-gray-500">
              Loading employee data...
            </div>
          </div>
        </div>
      </Page>
    );
  }

  return (
    <Page title="Edit Employee - Travel CRM">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0 space-y-6">
          {/* Header */}
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
                Edit Employee {employee?.name ? `- ${employee.name}` : ""}
              </h1>
              <p className="dark:text-dark-200 text-gray-600">
                Update employee information and details
              </p>
            </div>
          </div>

          {/* Employee Form */}
          <EmployeeForm
            initialData={employee}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isEditMode={true}
          />
        </div>
      </div>
    </Page>
  );
}
