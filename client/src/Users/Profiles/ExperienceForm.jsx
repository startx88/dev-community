import React from "react";
import { useFormik } from "formik";
import { ExperienceSchema } from "./Schema";
import { Redirect } from "react-router-dom";
import AlertMessage from "../../UI/Alert";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import Title from "../../Widgets/Title/Title";
import Checkbox from "../../UI/Checkbox";
const ExperienceForm = props => {
  const { parentProp } = props;

  const formik = useFormik({
    initialValues: {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: ""
    },
    validationSchema: ExperienceSchema,
    onSubmit: values => {
      parentProp.addExperience(values);
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
  if (parentProp.alert.show) {
    element = <Redirect to="/users/profiles" />;
  }

  return (
    <div className="profile-form">
      {element}
      <AlertMessage type={parentProp.alert.type} show={parentProp.alert.show} />

      <form className="panel  panel-white" onSubmit={handleSubmit}>
        <Title classname="mb-3">
          <h6>Add Experience</h6>
        </Title>
        <div className="row">
          <Input
            parentclass="col-sm-4"
            label="Enter Title"
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
            parentclass="col-sm-4"
            inputtype="input"
            label="Enter company"
            type="text"
            name="company"
            value={values.company}
            setFieldValue={setFieldValue}
            errors={errors}
            touched={touched}
            blur={handleBlur}
          />
          <Input
            parentclass="col-sm-4"
            inputtype="input"
            label="Enter location"
            type="text"
            name="location"
            value={values.location}
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
              Add Experience
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default ExperienceForm;
