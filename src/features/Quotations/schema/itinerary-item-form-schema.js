import * as yup from "yup";

const itemSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string(),
});

export default itemSchema;
