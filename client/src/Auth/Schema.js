import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().required()
});

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().required()
});
