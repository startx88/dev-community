import React, { useEffect, useRef } from "react";
import InputFile from "../../../UI/InputFile";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import useQuery from "../../../_hooks/useQuery";
import { useFormik } from "formik";
import { PostSchema } from "../schema";
import { Redirect, Link } from "react-router-dom";
import { addPost, getPost } from "../../../Stores/Actions";
import { useSelector, useDispatch } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectPost, selectAlert } from "../../../Stores/Selectors";

// Add/Update post form
const PostForm = props => {
  const dispatch = useDispatch();

  const refFocus = useRef(null);
  const { alert, post } = useSelector(
    createStructuredSelector({ alert: selectAlert, post: selectPost })
  );

  // Query and params
  const postId = props.match.params.id;
  const query = useQuery();
  const isEdit = query.get("edit") && post;

  // Fetch post after render
  useEffect(() => {
    if (postId) {
      dispatch(getPost(postId));
    }
  }, [getPost, postId]);

  const formik = useFormik({
    initialValues: {
      title: isEdit ? post.title : "",
      avatar: isEdit ? post.avatar : "",
      description: isEdit ? post.description : ""
    },
    enableReinitialize: true,
    validationSchema: PostSchema,
    onSubmit: (values, { resetForm }) => {
      isEdit
        ? dispatch(addPost(values, postId, "UPDATE"))
        : dispatch(addPost(values));
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
  if (alert.show) {
    element = <Redirect to="/users/posts" />;
  }

  return (
    <div className="profile-form">
      {element}
      <form className="panel  panel-white mt-5" onSubmit={handleSubmit}>
        <div className="add-post-title">
          <h4>Add new post</h4>
        </div>
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
          <Input
            parentclass="col-sm-12"
            label="Upload image"
            inputtype="input"
            type="text"
            name="avatar"
            value={values.avatar}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          {/* <InputFile
            parentclass="col-sm-12"
            label="Upload image"
            type="file"
            name="avatar"
            value={values.avatar}
            setFieldValue={setFieldValue}
          /> */}
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
            {!isEdit ? (
              <Button type="submit" btnType="outline-info">
                Add Post
              </Button>
            ) : (
              <Button type="submit" btnType="outline-info" classname="mr-2">
                Update Post
              </Button>
            )}
            <Link
              to="/users/posts"
              type="submit"
              className="btn btn-cancel ml-2"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default PostForm;
