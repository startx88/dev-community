import React from "react";
import { withRouter } from "react-router-dom";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import { useFormik } from "formik";
import * as yup from "yup";
import useAccess from "../../_hooks/isAuth";
import { useDispatch } from "react-redux";
import { addComment } from "../../Stores/Actions";

// Comment Schema
const commentSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  text: yup.string().required()
});

// Add Comment
const CommentForm = props => {
  const { user } = useAccess();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      text: ""
    },
    validationSchema: commentSchema,
    onSubmit: (values, { resetForm, initialValues, setSubmitting }) => {
      if (user.isAuth) {
        dispatch(addComment(props.postId, values));
        resetForm(initialValues);
      } else {
        props.history.push("/login");
      }
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
        readonly
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

      <Button type="submit" btnType="outline-info">
        Add Comment
      </Button>
    </form>
  );
};

export default withRouter(CommentForm);
