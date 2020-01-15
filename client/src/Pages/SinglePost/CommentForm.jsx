import React from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useFormik } from "formik";
import * as yup from "yup";

// Comment Schema
const commentSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  name: yup.string().required()
});

const CommentForm = props => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: props.user.email,
      text: ""
    },
    validationSchema: commentSchema,
    onSubmit: values => {
      console.log(values);
    }
  });
  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleBlur,
    handleSubmit
  } = formik;

  return (
    <form className="form-row" onSubmit={handleSubmit}>
      <Input
        parentclass="col-sm-6"
        inputtype="input"
        type="text"
        label="Name"
        name="name"
        value={values.name}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        blur={handleBlur}
      />
      <Input
        parentclass="col-sm-6"
        inputtype="input"
        type="email"
        label="Email"
        name="email"
        value={values.email}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        blur={handleBlur}
        readonly
      />
      <Input
        parentclass="col-sm-12"
        inputtype="textarea"
        label="Text"
        name="text"
        value={values.text}
        setFieldValue={setFieldValue}
        errors={errors}
        touched={touched}
        blur={handleBlur}
        placeholder="Write your comment here..."
      />

      <Button btnType="outline-info">Add Comment</Button>
    </form>
  );
};

export default CommentForm;
