// Import Dependencies
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { useState } from "react";

// Local Imports
import { Button, Card, Input } from "components/ui";
import employeeSchema from "../schema/employee-schema";
import { ROUTES } from "../../../app/router/routes";

// ----------------------------------------------------------------------

export function EmployeeForm({ employee = null, onSubmit }) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(employeeSchema),
    defaultValues: {
      name: employee?.name || "",
      email: employee?.email || "",
      phone_number: employee?.phone_number || "",
      employee_id: employee?.employee_id || "",
      department: employee?.department || "",
      designation: employee?.designation || "",
      joining_date: employee?.joining_date || "",
      location: employee?.location || "",
    },
  });

  const handleFormSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      console.log("Employee data:", data);

      if (onSubmit) {
        await onSubmit(data);
      } else {
        // Default behavior - just log and navigate
        console.log("Creating/updating employee:", data);
        navigate(ROUTES.EMPLOYEES.ALL);
      }
    } catch (error) {
      console.error("Error submitting employee form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(ROUTES.EMPLOYEES.ALL);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Card className="p-6">
        <h3 className="dark:text-dark-50 mb-6 text-lg font-semibold text-gray-800">
          Employee Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Full Name */}
          <div>
            <Input
              label="Full Name"
              placeholder="Enter full name"
              error={errors.name?.message}
              {...register("name")}
            />
          </div>

          {/* Email */}
          <div>
            <Input
              label="Email"
              type="text"
              placeholder="Enter email address"
              error={errors.email?.message}
              {...register("email")}
            />
          </div>

          {/* Phone Number */}
          <div>
            <Input
              label="Phone Number"
              type="text"
              placeholder="Enter phone number"
              error={errors.phone_number?.message}
              {...register("phone_number")}
            />
          </div>

          {/* Employee ID */}
          <div>
            <Input
              label="Employee ID"
              type="text"
              placeholder="Enter employee ID"
              error={errors.employee_id?.message}
              {...register("employee_id")}
            />
          </div>

          {/* Department */}
          <div>
            <Input
              label="Department"
              type="text"
              placeholder="Enter department"
              error={errors.department?.message}
              {...register("department")}
            />
          </div>

          {/* Designation */}
          <div>
            <Input
              label="Designation"
              type="text"
              placeholder="Enter designation"
              error={errors.designation?.message}
              {...register("designation")}
            />
          </div>

          {/* Joining Date */}
          <div>
            <Input
              label="Joining Date"
              type="date"
              error={errors.joining_date?.message}
              {...register("joining_date")}
            />
          </div>

          {/* Location */}
          <div>
            <Input
              label="Location"
              type="text"
              placeholder="Enter location"
              error={errors.location?.message}
              {...register("location")}
            />
          </div>
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outlined"
          onClick={handleCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" color="primary" loading={isSubmitting}>
          {employee ? "Update Employee" : "Create Employee"}
        </Button>
      </div>
    </form>
  );
}
