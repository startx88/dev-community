import React from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";

import Avatar from "../Avatar/Avatar";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addComment } from "../../Stores/Actions";

// Comment Schema
const commentSchema = yup.object().shape({
  text: yup.string().required()
});

// Post Comment
const PostComment = ({ postId, user, history, ...rest }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: user.user.name,
      email: user.user.email,
      text: ""
    },
    validationSchema: commentSchema,
    onSubmit: (values, { resetForm, initialValues, setSubmitting }) => {
      if (user.isAuth) {
        dispatch(addComment(postId, values));
        resetForm(initialValues);
      } else {
        history.push("/login");
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
    <div className="posts-add-comment">
      <Avatar
        classname="avatar circle"
        avatar={user.user.avatar}
        alt={user.user.name}
      />
      <form onSubmit={handleSubmit}>
        <Input
          inputtype="textarea"
          type="text"
          name="text"
          value={values.text}
          setFieldValue={setFieldValue}
          errors={errors}
          touched={touched}
          blur={handleBlur}
          placeholder="add comment"
        />
        <Button type="submit" btnType="primary">
          ADD
        </Button>
      </form>
    </div>
  );
};
export default PostComment;
