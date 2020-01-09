import React from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import LandingFooter from "../Pages/Home/Controls/LandingFooter";
import LandingHeader from "../Pages/Home/Controls/LandingHeader";
import { useFormik } from "formik";
import { loginSchema } from "./Schema";
import Input from "../UI/Input";
import Icons from "../UI/Icons";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const ForgotPassword = props => {
  const { auth, alert } = useSelector(state => state);

  const formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      console.log("values", values);
      //alert(JSON.stringify(values, null, 2));
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

  if (auth.isAuthenticated) {
    return <Redirect to="/users" />;
  }

  return (
    <div className="landing">
      <LandingHeader />
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
                <Button type="submit" classname="btn-info" btnType="auth">
                  Reset Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default ForgotPassword;
