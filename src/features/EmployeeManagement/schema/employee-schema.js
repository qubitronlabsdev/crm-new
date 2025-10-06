import * as yup from "yup";

// Employee Schema for employee management - exactly as requested
const employeeSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone_number: yup.string().required("Phone Number is required"),
  employee_id: yup.string().required("Employee ID is required"),
  department: yup.string().required("Department is required"),
  designation: yup.string().required("Designation is required"),
  joining_date: yup.date().required("Joining Date is required"),
  location: yup.string().required("Location is required"),
});

export default employeeSchema;
