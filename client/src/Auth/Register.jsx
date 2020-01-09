import React from "react";
import Button from "../UI/Button";
import { Link } from "react-router-dom";
import LandingFooter from "../Pages/Home/Controls/LandingFooter";
import LandingHeader from "../Pages/Home/Controls/LandingHeader";
import { useFormik } from "formik";
import { registerSchema } from "./Schema";
import Input from "../UI/Input";

import { useDispatch, useSelector } from "react-redux";
import { userRegistration } from "../Stores/Actions";

const Register = props => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.auth);
  //  console.log("user", token);

  // button sleep for 2 seconds
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password2: "",
      mobile: ""
    },
    enableReinitialize: true,
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm, initialValues, setSubmitting }) => {
      const updateValues = {
        name: values.name,
        email: values.email,
        password: values.password,
        mobile: values.mobile
      };
      await sleep(2000);
      dispatch(userRegistration(updateValues));
      resetForm(initialValues);
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
    <div className="landing">
      <LandingHeader />
      <div className="landing-content">
        <div className="landing-body">
          <div className="auth">
            <form onSubmit={handleSubmit}>
              <div className="auth-title">
                {/* <Image src={LogoImage} classname="mb-3" /> */}
                <h2>Register</h2>
                <small>
                  If you have an account, please click on{" "}
                  <Link to="/login">Login</Link>
                </small>
              </div>
              <Input
                inputtype="input"
                type="text"
                name="name"
                value={values.name}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                blur={handleBlur}
                placeholder="Full Name"
              />
              <Input
                inputtype="input"
                type="email"
                name="email"
                value={values.email}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                blur={handleBlur}
                placeholder="Email"
              />
              <div className="row">
                <Input
                  parentclass="col-sm-6"
                  inputtype="input"
                  type="password"
                  name="password"
                  value={values.password}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  blur={handleBlur}
                  placeholder="Password"
                />
                <Input
                  parentclass="col-sm-6"
                  inputtype="input"
                  type="password"
                  name="password2"
                  value={values.password2}
                  setFieldValue={setFieldValue}
                  touched={touched}
                  errors={errors}
                  blur={handleBlur}
                  placeholder="Confirm password"
                />
              </div>

              <Input
                inputtype="input"
                type="text"
                name="mobile"
                value={values.mobile}
                setFieldValue={setFieldValue}
                touched={touched}
                errors={errors}
                blur={handleBlur}
                placeholder="Mobile No."
              />
              <div className="form-group text-center">
                <Button type="submit" classname="btn-info" btnType="auth">
                  Register
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

export default Register;
