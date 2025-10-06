import * as yup from "yup";

// Itinerary Schema for travel itinerary management
const itinerarySchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  customer_name: yup.string().required("Customer name is required"),
  customer_email: yup
    .string()
    .email("Invalid email")
    .required("Customer email is required"),
  destination: yup.string().required("Destination is required"),
  start_date: yup.date().required("Start date is required"),
  end_date: yup
    .date()
    .required("End date is required")
    .min(yup.ref("start_date"), "End date must be after start date"),
  duration_days: yup
    .number()
    .positive("Duration must be positive")
    .required("Duration is required"),
  total_cost: yup
    .number()
    .positive("Total cost must be positive")
    .required("Total cost is required"),
  status: yup.string().required("Status is required"),
  priority: yup.string().required("Priority is required"),
  agent_assigned: yup.string().required("Agent assignment is required"),
  departure_city: yup.string().required("Departure city is required"),
  accommodation_type: yup.string(),
  transportation_mode: yup.string(),
  special_requirements: yup.string(),
  notes: yup.string(),
});

export default itinerarySchema;
