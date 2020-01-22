import React, { useRef, useEffect } from "react";
import { useFormik } from "formik";
import { EducationSchema } from "./Schema";
import { Redirect } from "react-router-dom";
import AlertMessage from "../../../UI/Alert";
import Input from "../../../UI/Input";
import Button from "../../../UI/Button";
import Title from "../../../Widgets/Title/Title";
import Checkbox from "../../../UI/Checkbox";

const EducationForm = props => {
  const refFocus = useRef(null);

  const {
    alert: { show, type, message },
    addEducation
  } = props.parentProps;

  const formik = useFormik({
    initialValues: {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: ""
    },
    validationSchema: EducationSchema,
    onSubmit: (values, { resetForm }) => {
      addEducation(values);
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
  if (show) {
    element = <Redirect to="/users/profiles" />;
  }

  return (
    <div className="profile-form">
      {element}
      <AlertMessage type={type} show={show}>
        {message}
      </AlertMessage>

      <form className="panel  panel-white" onSubmit={handleSubmit}>
        <Title notitle classname="mb-3">
          <h6>Add Education</h6>
        </Title>
        <div className="row">
          <Input
            refs={refFocus}
            parentclass="col-sm-4"
            label="Enter school"
            inputtype="input"
            type="text"
            name="school"
            value={values.school}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          <Input
            parentclass="col-sm-4"
            inputtype="input"
            label="Enter degree"
            type="text"
            name="degree"
            value={values.degree}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          <Input
            parentclass="col-sm-4"
            inputtype="input"
            label="Enter fieldofstudy"
            type="text"
            name="fieldofstudy"
            value={values.fieldofstudy}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          <Input
            parentclass="col-sm-4"
            inputtype="input"
            label="From"
            type="date"
            name="from"
            value={values.from}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          <Input
            parentclass="col-sm-4"
            inputtype="input"
            label="To"
            type="date"
            name="to"
            value={values.to}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />

          <Checkbox
            name="current"
            label="Current"
            parentclass="col-sm-4"
            type="checkbox"
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
            top
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
              Add Education
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EducationForm;
