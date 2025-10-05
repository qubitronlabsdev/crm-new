import * as yup from "yup";

// Simple Lead Schema for initial lead creation
const simpleLeadSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  agent_assignment: yup.string().required("Agent assignment is required"),
  status: yup.string().required("Status is required"),
  priority: yup.string().required("Priority is required"),
  lead_source: yup.string().required("Lead source is required"),
});

export default simpleLeadSchema;
