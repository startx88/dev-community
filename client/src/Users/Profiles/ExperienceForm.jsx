import React from 'react'
import { useFormik } from 'formik'
import { ExperienceSchema } from './Schema'
import AlertMessage from '../../UI/Alert'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Title from '../../Widgets/Title/Title'
import Checkbox from '../../UI/Checkbox'
const ExperienceForm = props => {

    const formik = useFormik({
        initialValues: {
            title: "",
            company: "",
            location: "",
            from: "",
            to: "",
            current: "",
            description: ""
        },
        validationSchema: ExperienceSchema,
        onSubmit: values => {
            console.log(values)
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
        <div className="profile-form">
            <AlertMessage type={alert.type} show={alert.show}>
                {alert.message}
            </AlertMessage>

            <form className='panel  panel-white' onSubmit={handleSubmit}>
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

                    <Checkbox name="current"
                        label="Current" parentclass="col-sm-4"
                        type="checkbox" setFieldValue={setFieldValue}
                        errors={errors}
                        touched={touched}
                        blur={handleBlur}
                        top />
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
                        <button type="submit">Save</button>
                        <Button type="submit" btnType="outline-info">Add Experience</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default ExperienceForm