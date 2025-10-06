import * as yup from "yup";
// Validation Schema

const leadFormSchema = yup.object({
  travel_date: yup.string(),
  departure_city: yup.string().required("Departure city is required"),
  destination: yup.string().required("Destination is required"),
  days: yup
    .number()
    .min(1, "Days must be at least 1")
    .required("Days is required"),
  nights: yup
    .number()
    .min(1, "Nights must be at least 1")
    .required("Nights is required"),
  adults: yup
    .number()
    .min(1, "Adults must be at least 1")
    .required("Adults is required"),
  children: yup.number().min(0, "Children must be at least 0"),
  children_age: yup.string().when("children", {
    is: (children) => children > 0,
    then: (schema) =>
      schema.required(
        "Children ages are required when children count is greater than 0",
      ),
    otherwise: (schema) => schema.nullable(),
  }),
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email"),
  phone: yup.string().required("Phone number is required"),
  agent_assignment: yup.string().required("Agent assignment is required"),
  // travel_time: yup.string().required("Travel time is required"),
  status: yup.string().required("Status is required"),
  priority: yup.string().required("Priority is required"),
  lead_source: yup.string().required("Lead source is required"),
  estimated_value: yup.number().min(0, "Estimated value must be positive"),
  // expected_close_date: yup.string().required("Expected close date is required"),
  travel_preferences: yup.string(),
  // notes: yup.string(),
});

export default leadFormSchema;
