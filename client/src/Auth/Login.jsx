import React from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import LandingFooter from "../Pages/Home/Controls/LandingFooter";
import LandingHeader from "../Pages/Home/Controls/LandingHeader";
import { useFormik } from "formik";
import { loginSchema } from "./Schema";
import Input from "../UI/Input";

const Login = props => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    shcemaValidator: loginSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  const { values, touched, errors, setFieldValue, handleBlur } = formik;

  return (
    <div className="landing">
      <LandingHeader />
      <div className="landing-content">
        <div className="landing-body">
          <div className="auth">
            <form onSubmit={formik.handleSubmit} className="">
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
      <LandingFooter />
    </div>
  );
};

export default Login;
