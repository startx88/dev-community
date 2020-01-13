import * as yup from "yup";

export const PostSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required()
});
