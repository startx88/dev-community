import React from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

import { useFormik } from "formik";
import { loginSchema } from "./Schema";
import Input from "../UI/Input";
import Icons from "../UI/Icons";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ForgotPassword = props => {
  const { auth } = useSelector(state => state);

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      console.log("values", values);
    }
  });

  const {
    values,
    touched,
    errors,
    setFieldValue,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = formik;

  if (auth.isAuth) {
    return <Redirect to="/users" />;
  }

  return (
    <div className="landing-content">
      <div className="landing-body">
        <div className="auth">
          <form onSubmit={handleSubmit}>
            <div className="auth-title">
              {/* <Image src={LogoImage} classname="mb-3" /> */}
              <h2>Login</h2>
              <small>
                If you don't have an account, please click on{" "}
                <Link to="/register">register</Link>
              </small>
            </div>
            <Input
              inputtype="input"
              type="email"
              name="email"
              value={values.email}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              blur={handleBlur}
              placeholder="Email"
            />
            <div className="form-group text-center">
              <Link to="/login" className="btn btn-link btn-forgot btn-block">
                <Icons classname="mr-1" icon="lock" /> Back to login
              </Link>
              <Button
                isSubmitting={isSubmitting}
                type="submit"
                classname="btn-info"
                btnType="auth"
              >
                Reset Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
