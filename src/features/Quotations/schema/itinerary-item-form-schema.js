import * as yup from "yup";

const itemSchema = yup.object({
  type: yup.string().required("Item type is required"),
  title: yup.string().required("Title is required"),
  description: yup.string(),
  time: yup.string(),
  location: yup.string(),
  notes: yup.string(),
});

export default itemSchema;
