import * as yup from "yup";

const itemSchema = yup.object({
  type: yup.string().required("Item type is required"),
  title: yup.string().required("Title is required"),
  description: yup.string(),
  cost: yup
    .number()
    .transform((value, originalValue) => {
      // Handle string to number conversion
      return originalValue === "" ? 0 : Number(originalValue);
    })
    .min(0, "Cost must be positive")
    .required("Cost is required"),
  time: yup.string(),
  location: yup.string(),
  notes: yup.string(),
});

export default itemSchema;
