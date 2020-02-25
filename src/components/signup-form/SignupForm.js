import React, { useState } from "react";
import "./signupForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { signup } from "../../store/actions/userActions";

function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users, shallowEqual);
  const [isHidden, setHidden] = useState({
    formFirst: "",
    formSecond: "form-hidden"
  });
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters or longer"),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Enter password again"),
    city: Yup.string().required("City is required"),
    street: Yup.string().required("Street is required"),
    number: Yup.string().required("Building number is required")
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    city: "",
    street: "",
    number: ""
  };

  function handleFormForward() {
    setHidden({
      formFirst: "form-hidden",
      formSecond: ""
    })
  }

  function handleFormBackward() {
    setHidden({
      formFirst: "",
      formSecond: "form-hidden"
    })
  }


  function handleSubmit(values, actions) {
    console.log("signup form", values);
    actions.setSubmitting(true);
    dispatch(signup(values));
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 2000);
  };

  return (
    <div className="signup">
      <h1 className="signup__header">Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="signup__form">
            <div className={isHidden.formFirst}>
              <div className="field">
                <label htmlFor="firstName">First Name</label>
                <ErrorMessage
                  name="firstName"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="firstName" type="text" />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last Name</label>
                <ErrorMessage
                  name="lastName"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="lastName" type="text" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <ErrorMessage
                  name="email"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="email" type="text" />
              </div>
              <div className="field">
                <label htmlFor="password">Password</label>
                <ErrorMessage
                  name="password"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="password" type="password" />
              </div>
              <div className="field">
                <label htmlFor="passwordConfirmation">Confirm Password</label>
                <ErrorMessage
                  name="passwordConfirmation"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="passwordConfirmation" type="password" />
              </div>
              <button type="button" onClick={handleFormForward}>
                Next
              </button>
            </div>
            <div className={isHidden.formSecond}>
              <div className="field">
                <label htmlFor="city">City</label>
                <ErrorMessage
                  name="city"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="city" type="text" />
              </div>
              <div className="field">
                <label htmlFor="street">Street</label>
                <ErrorMessage
                  name="street"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="street" type="text" />
              </div>
              <div className="field">
                <label htmlFor="number">Number</label>
                <ErrorMessage
                  name="number"
                  render={msg => <span className="error">{msg}</span>}
                />
                <Field name="number" type="text" />
              </div>
              <div>
                {user && user.error ? (
                  <span className="error">{user.error}</span>
                ) : null}
              </div>
              <button type="button" onClick={handleFormBackward}>
                Back
              </button>
              <button type="submit" disabled={isSubmitting}>
                Signup
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;
