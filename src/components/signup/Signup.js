import React from "react";
import "./signup.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be 8 characters or longer"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Enter password again")
});

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: ""
};

const Signup = () => {
  return (
    <div className="signup">
      <h1 className="signup__header">Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form className="signup__form">
            <div className="field">
              <label htmlFor="email">Email</label>
              <Field name="email" type="text" />
              <ErrorMessage
                name="email"
                render={msg => <span className="error">{msg}</span>}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" />
              <ErrorMessage
                name="password"
                render={msg => <span className="error">{msg}</span>}
              />
            </div>
            <div className="field">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <Field
                name="passwordConfirmation"
                type="password"
              />
              <ErrorMessage
                name="passwordConfirmation"
                render={msg => <span className="error">{msg}</span>}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              Signup
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
