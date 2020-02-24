import React from "react";
import "./signupForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createMasterUser } from "../../store/actions/actions";

const Signup = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  const handleSubmit = (values, actions) => {
    try {
      actions.setSubmitting(true);
      console.log(JSON.stringify(values, null, 2));
      dispatch(createMasterUser(values))
      actions.setSubmitting(false);
    } catch (err) {
      console.error(err.stack)
    }
  };

  return (
    <div className="signup">
      <h1 className="signup__header">Signup</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting }) => (
          <Form className="signup__form">
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
