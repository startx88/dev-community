import React, { useState } from 'react'
import { useFormik } from 'formik'
import { ExperienceSchema } from './Schema'
import AlertMessage from '../../UI/Alert'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import Title from '../../Widgets/Title/Title'
import Checkbox from '../../UI/Checkbox'

const ProfileForm = props => {
    const [social, setSocial] = useState(false);
    const formik = useFormik({
        initialValues: {
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            bio: "",
            gitusername: "",
            youtube: "",
            twitter: "",
            facebook: "",
            linkedin: "",
            instagram: ""
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

    const socialHandler = () => {
        setSocial(!social)
    }
    return <div className="profile-form">
        <AlertMessage type={alert.type} show={alert.show}>
            {alert.message}
        </AlertMessage>

        <form className='panel  panel-white' onSubmit={handleSubmit}>
            <Title classname="mb-3">
                <h6>Add Profile</h6>
            </Title>
            <div className="row">
                <Input
                    parentclass="col-sm-6"
                    label="Enter company"
                    inputtype="input"
                    type="text"
                    name="company"
                    value={values.company}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    blur={handleBlur}
                />
                <Input
                    parentclass="col-sm-6"
                    inputtype="input"
                    label="Enter website"
                    type="text"
                    name="website"
                    value={values.website}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    blur={handleBlur}
                />
                <Input
                    parentclass="col-sm-12"
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
                    parentclass="col-sm-6"
                    inputtype="input"
                    label="Status"
                    type="text"
                    name="status"
                    value={values.status}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    blur={handleBlur}

                />
                <Input
                    parentclass="col-sm-6"
                    inputtype="input"
                    label="Skills"
                    type="text"
                    name="skills"
                    value={values.skills}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    blur={handleBlur}
                />
                <Input
                    parentclass="col-sm-12"
                    inputtype="input"
                    label="Git username"
                    type="text"
                    name="gitusername"
                    value={values.gitusername}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    blur={handleBlur}
                />
                <Input
                    parentclass="col-sm-12"
                    inputtype="textarea"
                    label="Short note about you"
                    name="bio"
                    value={values.bio}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    blur={handleBlur}
                />

                <div className="col-sm-12 mb-3">
                    <Button btnType="light" classname="radius-0 mb-2" clicked={socialHandler}>Add Social Network Links</Button>
                    {social && <div className="social row">
                        <Input
                            parentclass="col-sm-6"
                            inputtype="input"
                            label="Youtube"
                            type="text"
                            name="youtube"
                            value={values.youtube}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                            blur={handleBlur}
                        />
                        <Input
                            parentclass="col-sm-6"
                            inputtype="input"
                            label="Twitter"
                            type="text"
                            name="twitter"
                            value={values.twitter}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                            blur={handleBlur}
                        />
                        <Input
                            parentclass="col-sm-6"
                            inputtype="input"
                            label="Facebook"
                            type="text"
                            name="facebook"
                            value={values.facebook}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                            blur={handleBlur}
                        />
                        <Input
                            parentclass="col-sm-6"
                            inputtype="input"
                            label="Linked In"
                            type="text"
                            name="linkedin"
                            value={values.linkedin}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                            blur={handleBlur}
                        />
                        <Input
                            parentclass="col-sm-12"
                            inputtype="input"
                            label="Instagram"
                            type="text"
                            name="instagram"
                            value={values.instagram}
                            setFieldValue={setFieldValue}
                            errors={errors}
                            touched={touched}
                            blur={handleBlur}
                            icon=""
                        />
                    </div>
                    }
                </div>
                <div className="col-sm-12">
                    <Button type="submit" btnType="outline-info">Add Education</Button>
                </div>
            </div>
        </form>
    </div>
}
export default ProfileForm