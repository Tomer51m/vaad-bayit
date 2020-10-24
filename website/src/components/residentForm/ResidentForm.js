import React, { useState } from "react";
import "./residentForm.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/actions/buildingsActions";

const ResidentForm = ({ editUser }) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);
  
  let initialValues = {};
  if (editUser) {
    let {
      first_name,
      last_name,
      apartment_number,
      floor_number,
      is_owner
    } = editUser;

    initialValues = {
      firstName: first_name,
      lastName: last_name,
      apartmentNumber: apartment_number,
      floorNumber: floor_number,
      isOwner: is_owner
    };
  } else {
    initialValues = {
      firstName: "",
      lastName: "",
      apartmentNumber: "",
      floorNumber: "",
      isOwner: null
    };
  }

  const errorSchema = Yup.object({
    firstName: Yup.string().required("First name is requierd"),
    lastName: Yup.string().required("Last name is requierd"),
    apartmentNumber: Yup.number().required("Apartment number is requierd"),
    floorNumber: Yup.number().required("Floor number is requierd"),
    isOwner: Yup.boolean().required("Required")
  });

  const handleSubmit = (values, actions) => {
    actions.setSubmitting(true);
    console.log(JSON.stringify(values));
    if (editUser) {
      try {
        dispatch(updateUser(values, editUser.res_id));
        actions.setSubmitting(false);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        // dispatch(createUser(values));
        actions.resetForm();
      } catch (err) {
        console.error(err);
      }
    }
  }

  const handelCancel = () => {
    console.log("canceled");
    setRedirect(true);
  }
  if (redirect) {
    return <Redirect to="/home/residents" />;
  } else {
    return (
      <div className="addresident">
        <h1 className="addresident__header">Add Resident</h1>
        {console.log("initial values", initialValues)}
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={errorSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="addresident__form">
              <div className="field-container">
                <label className="field-label" htmlFor="firstName">
                  First Name
                </label>
                <Field className="field-input" name="firstName" type="text" />
                <ErrorMessage name="firstName">
                  {msg => <span className="error">{msg}</span>}
                </ErrorMessage>
              </div>
              <div className="field-container">
                <label className="field-label" htmlFor="lastName">
                  Last Name
                </label>
                <Field className="field-input" name="lastName" type="text" />
                <ErrorMessage name="lastName">
                  {msg => <span className="error">{msg}</span>}
                </ErrorMessage>
              </div>
              <div className="field-container">
                <label className="field-label" htmlFor="floorNumber">
                  Floor
                </label>

                <Field
                  className="field-input"
                  name="floorNumber"
                  type="number"
                />
                <ErrorMessage name="floorNumber">
                  {() => <span className="error">Must add a floor number</span>}
                </ErrorMessage>
              </div>
              <div className="field-container">
                <label className="field-label" htmlFor="apartmentNumber">
                  Apartment Number
                </label>
                <Field
                  className="field-input"
                  name="apartmentNumber"
                  type="number"
                />
                <ErrorMessage name="apartmentNumber">
                  {() => (
                    <span className="error">Must add an apartment number</span>
                  )}
                </ErrorMessage>
              </div>
              <div className="field-container-radio">
                <Field
                  className="field-radio"
                  name="isOwner"
                  type="radio"
                  value="true"
                />
                <label className="field-label-radio" htmlFor="isOwner">
                  Owner
                </label>
                <Field
                  className="field-radio"
                  name="isOwner"
                  type="radio"
                  value="false"
                />
                <label className="field-label-radio" htmlFor="isOwner">
                  Renting
                </label>
                <ErrorMessage name="isOwner">
                  {() => <span className="error">Pick "owner or renting"</span>}
                </ErrorMessage>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
              <button className="cancel" onClick={handelCancel}>
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

export default ResidentForm;
