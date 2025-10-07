import * as yup from "yup";
import itineraryItemSchema from "./itinerary-item-form-schema";

// Step 1: Travel Details Schema
export const travelDetailsSchema = yup.object({
  travel_date: yup.string().required("Travel date is required"),
  // travel_time: yup.string().required("Travel time is required"),
  // expected_close_date: yup.string().required("Expected close date is required"),
  departure_city: yup.string().required("Departure city is required"),
  destination: yup.string().required("Destination is required"),
  days: yup
    .number()
    .min(1, "Days must be at least 1")
    .required("Days is required"),
  nights: yup
    .number()
    .min(0, "Nights must be at least 0")
    .max(yup.ref("days"), "Nights cannot be more than days")
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
  travel_preferences: yup.string(),
});

// Step 2: Hotels & Transportation Schema
export const hotelsTransportationSchema = yup.object({
  hotelsNotIncluded: yup.boolean().default(false),
  hotels: yup.array().when("hotelsNotIncluded", {
    is: true,
    then: (schema) => schema.nullable(),
    otherwise: (schema) =>
      schema
        .of(
          yup.object({
            nights: yup
              .array()
              .of(yup.string())
              .min(1, "At least one night must be selected for each hotel"),
            hotelName: yup.string().required("Hotel name is required"),
            city: yup.string().required("City is required"),
            category: yup.string().required("Hotel category is required"),
            roomType: yup.string().nullable(),
            comment: yup.string().nullable(),
          }),
        )
        .min(1, "At least one hotel is required"),
  }),

  // Itinerary data integrated into this step
  itinerary: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        title: yup.string().required(),
        items: yup.array().of(itineraryItemSchema).default([]),
      }),
    )
    .default([]),

  transportation: yup.object({
    flight: yup.string().when("flightNotIncluded", {
      is: true,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.strip(),
    }),
    flightNotIncluded: yup.boolean(),
    cab: yup.string().when("cabNotIncluded", {
      is: true,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.strip(),
    }),
    cabNotIncluded: yup.boolean(),
    bus: yup.string().when("busNotIncluded", {
      is: true,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.strip(),
    }),
    busNotIncluded: yup.boolean(),
    train: yup.string().when("trainNotIncluded", {
      is: true,
      then: (schema) => schema.nullable(),
      otherwise: (schema) => schema.strip(),
    }),
    trainNotIncluded: yup.boolean(),
  }),

  // so now either this will be final if above one not working
  // transportation: yup.object({
  //   flightNotIncluded: yup.boolean().default(false),
  //   flight: yup.string().nullable(),
  //   cabNotIncluded: yup.boolean().default(false),
  //   cab: yup.string().nullable(),
  //   busNotIncluded: yup.boolean().default(false),
  //   bus: yup.string().nullable(),
  //   trainNotIncluded: yup.boolean().default(false),
  //   train: yup.string().nullable(),
  // }),
});

// Step 3: Inclusions & Exclusions Schema
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

// Step 4: Cost & Pricing Schema
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
  // pricing_notes: yup.string(),
});

// Step 5: Review Schema
export const reviewSchema = yup.object({
  template_selection: yup.string().required("Template selection is required"),
});

// Combined Quotation Schema
export const combinedQuotationSchema = yup.object({
  ...travelDetailsSchema.fields,
  ...hotelsTransportationSchema.fields,
  ...inclusionsExclusionsSchema.fields,
  ...costPricingSchema.fields,
  ...reviewSchema.fields,
});

// Alias for backward compatibility
export const quotationSchema = combinedQuotationSchema;
