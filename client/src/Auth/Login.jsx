import React from "react";
import Button from "../UI/Button";
import { Link, Redirect } from "react-router-dom";

import { useFormik } from "formik";
import { loginSchema } from "./Schema";
import Input from "../UI/Input";
import Icons from "../UI/Icons";
import AlertMessage from "../UI/Alert";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Stores/Actions";

// lOGIN COMPONENT
const Login = props => {
  const { auth, alert } = useSelector(state => state);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "arya.creativemind@gmail.com",
      password: "Admin123"
    },
    validationSchema: loginSchema,
    onSubmit: values => {
      dispatch(userLogin(values));
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

  if (auth.isAuth) {
    return <Redirect to="/users" />;
  }
  return (
    <div className="landing-content">
      <div className="landing-body">
        <div className="auth">
          <AlertMessage type={alert.type} show={alert.show}>
            {alert.message}
          </AlertMessage>

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
            <Input
              inputtype="input"
              type="password"
              name="password"
              value={values.password}
              setFieldValue={setFieldValue}
              errors={errors}
              touched={touched}
              blur={handleBlur}
              placeholder="*****"
            />
            <div className="form-group text-center">
              <Link
                to="/forgot-password"
                className="btn btn-link btn-forgot btn-block"
              >
                <Icons classname="mr-1" icon="key" /> Forgot Password
              </Link>
              <Button type="submit" classname="btn-info" btnType="auth">
                Login
              </Button>

              <span className="sep">Or</span>
              <div className="social-btn">
                <small>Sign in with Google or Facebook </small>
                <Button btnType="auth" classname="btn-danger">
                  Google
                </Button>
                <Button btnType="auth" classname="btn-primary">
                  Facebook
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
