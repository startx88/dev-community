import * as yup from "yup";

export const ProfileSchema = yup.object().shape({
  status: yup.string().required(),
  company: yup.string().required(),
  location: yup.string().required()
});

export const ExperienceSchema = yup.object().shape({
  title: yup.string().required(),
  company: yup.string().required(),
  location: yup.string().required(),
  from: yup.date().required(),
  current: yup.string().required(),
  description: yup.string().required()
});

export const EducationSchema = yup.object().shape({
  school: yup.string().required(),
  degree: yup.string().required(),
  fieldofstudy: yup.string().required(),
  from: yup.date().required(),
  current: yup.string().required(),
  description: yup.string().required()
});
