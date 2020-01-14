import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { PostSchema } from "./schema";
import { Redirect } from "react-router-dom";
import AlertMessage from "../../UI/Alert";
import InputFile from "../../UI/InputFile";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Title from "../../Widgets/Title/Title";

// Add/Update post form
const PostForm = props => {
  const refFocus = useRef(null);
  const { parentProp } = props;

  const formik = useFormik({
    initialValues: {
      title: "",
      avatar: "",
      description: ""
    },
    validationSchema: PostSchema,
    onSubmit: (values, { resetForm }) => {
      parentProp.addPost(values);
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

  // redirect if data submit success
  let element = null;
  //if (parentProp.alert.show) {
  //element = <Redirect to="/users/posts" />;
  // }

  return (
    <div className="profile-form">
      {element}
      {/* <AlertMessage type={parentProp.alert.type} show={parentProp.alert.show}>
        {parentProp.alert.message}
      </AlertMessage> */}
      <form className="panel  panel-white" onSubmit={handleSubmit}>
        <Title classname="mb-3">
          <h6>Add new post</h6>
        </Title>
        <div className="row">
          <Input
            refs={refFocus}
            parentclass="col-sm-12"
            label="Enter title"
            inputtype="input"
            type="text"
            name="title"
            value={values.title}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          <InputFile
            parentclass="col-sm-12"
            label="Upload image"
            type="file"
            name="avatar"
            value={values.avatar}
            setFieldValue={setFieldValue}
          />
          <Input
            parentclass="col-sm-12"
            inputtype="textarea"
            label="Description"
            name="description"
            value={values.description}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          <div className="col-sm-12">
            <Button type="submit" btnType="outline-info">
              Add Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default PostForm;
