import * as yup from "yup";

// Step 1: Travel Details Schema
export const travelDetailsSchema = yup.object({
  travel_date: yup.string().required("Travel date is required"),
  travel_time: yup.string().required("Travel time is required"),
  expected_close_date: yup.string().required("Expected close date is required"),
  departure_city: yup.string().required("Departure city is required"),
  destination: yup.string().required("Destination is required"),
  days: yup
    .number()
    .min(1, "Days must be at least 1")
    .required("Days is required"),
  nights: yup
    .number()
    .min(0, "Nights must be at least 0")
    .required("Nights is required"),
  adults: yup
    .number()
    .min(1, "Adults must be at least 1")
    .required("Adults is required"),
  children: yup
    .number()
    .min(0, "Children must be at least 0")
    .required("Children is required"),
  children_age: yup.string().when("children", {
    is: (children) => children > 0,
    then: (schema) =>
      schema.required(
        "Children ages are required when children count is greater than 0",
      ),
    otherwise: (schema) => schema.nullable(),
  }),
  budget: yup
    .number()
    .min(0, "Budget must be positive")
    .required("Budget is required"),
  special_requests: yup.string(),
});

// Step 2: Hotels & Transportation Schema
export const hotelsTransportationSchema = yup.object({
  hotel_rating: yup
    .string()
    .oneOf(["1", "2", "3", "4", "5"])
    .required("Hotel rating is required"),
  room_type: yup
    .string()
    .oneOf(["standard", "deluxe", "suite", "premium"])
    .required("Room type is required"),
  meal_plan: yup.string().required("Meal plan is required"),
  transportation_mode: yup
    .string()
    .oneOf(["train", "flight", "car", "bus"])
    .required("Transportation mode is required"),
  transportation_charges: yup.array().of(yup.object()),
});

// Step 3: Cost & Pricing Schema
export const costPricingSchema = yup.object({
  base_package_price: yup
    .number()
    .min(0, "Base package price must be positive")
    .required("Base package price is required"),
  taxes_services_charges: yup
    .number()
    .min(0, "Taxes & services charges must be positive")
    .required("Taxes & services charges are required"),
  total_package_price: yup
    .number()
    .min(0, "Total package price must be positive")
    .required("Total package price is required"),
  per_person_price: yup
    .number()
    .min(0, "Per person price must be positive")
    .required("Per person price is required"),
  payment_terms: yup
    .string()
    .oneOf([
      "full_advance",
      "50_50",
      "30_70",
      "installments",
      "on_confirmation",
    ])
    .required("Payment terms are required"),
  pricing_notes: yup.string(),
});

// Step 4: Inclusions & Exclusions Schema
export const inclusionsExclusionsSchema = yup.object({
  inclusions: yup
    .array()
    .of(yup.string())
    .min(1, "At least one inclusion is required"),
  exclusions: yup
    .array()
    .of(yup.string())
    .min(1, "At least one exclusion is required"),
  cancellation_policy: yup.string().required("Cancellation policy is required"),
  terms_conditions: yup.string().required("Terms & conditions are required"),
});

// Step 5: Review Schema
export const reviewSchema = yup.object({
  template_selection: yup.string().required("Template selection is required"),
});

// Combined Quotation Schema
export const combinedQuotationSchema = yup.object({
  ...travelDetailsSchema.fields,
  ...hotelsTransportationSchema.fields,
  ...costPricingSchema.fields,
  ...inclusionsExclusionsSchema.fields,
  ...reviewSchema.fields,
});

// Alias for backward compatibility
export const quotationSchema = combinedQuotationSchema;
