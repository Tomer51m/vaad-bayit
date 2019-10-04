import React from "react";
import "./residentForm.css";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ResidentForm = ({firstName = '', lastName = '', apartmentNumber = '', floorNumber = '', isOwner = null }) => {
  const initialValues = {
    firstName: '' || firstName,
    lastName: "" || lastName,
    apartmentNumber: "" || apartmentNumber,
    floorNumber: "" || floorNumber,
    isOwner: null || isOwner
  };

  const errorSchema = Yup.object({
    firstName: Yup.string().required("First name is requierd"),
    lastName: Yup.string().required("Last name is requierd"),
    apartmentNumber: Yup.number().required("Apartment number is requierd"),
    floorNumber: Yup.number().required("Floor number is requierd"),
    isOwner: Yup.boolean().required("Required")
  });

  return (
    <div className="addresident">
      <h1 className="addresident__header">Add Resident</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={errorSchema}
        onSubmit={async (values, actions) => {
          actions.setSubmitting(true);
          console.log(JSON.stringify(values));
          try {
            const response = await fetch(`http://localhost:8080/api/users/`, {
              method: "POST",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({
                first_name: values.firstName,
                last_name: values.lastName,
                apartment_number: values.apartmentNumber,
                floor_number: values.floorNumber,
                is_owner: values.isOwner
              })
            });
            const data = await response.json();
            console.log("response from server", data);
            actions.resetForm();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {({ values, isSubmitting }) => (
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

              <Field className="field-input" name="floorNumber" type="number" />
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResidentForm;
