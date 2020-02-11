import React, { useState } from "react";
import "./residentForm.scss";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/actions/actions";

const ResidentForm = ({ editUser, editMode }) => {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  let initialValues = {};
  if (editMode) {
    initialValues = {
      firstName: editUser.first_name,
      lastName: editUser.last_name,
      apartmentNumber: editUser.apartment_number,
      floorNumber: editUser.floor_number,
      isOwner: editUser.is_owner
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

  function handelCancel() {
    console.log("canceled");
    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="addresident">
        <h1 className="addresident__header">Add Resident</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={errorSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            console.log(JSON.stringify(values));
            if (editMode) {
              try {
                const response = await fetch(
                  `http://localhost:8080/api/users/`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                      first_name: values.firstName,
                      last_name: values.lastName,
                      apartment_number: values.apartmentNumber,
                      floor_number: values.floorNumber,
                      is_owner: values.isOwner,
                      res_id: editUser.res_id
                    })
                  }
                );
                const data = await response.json();
                console.log("response from server", data);
                actions.resetForm();
              } catch (err) {
                console.error(err);
              }
            } else {
              try {
                dispatch(createUser(values));
                actions.resetForm();
              } catch (err) {
                console.error(err);
              }
            }
          }}
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
