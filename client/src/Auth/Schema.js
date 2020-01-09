import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  password2: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirm is required"),
  mobile: yup
    .number()
    .required()
    .positive()
    .integer()
});
