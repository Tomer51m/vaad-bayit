import React from "react";
import "./login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import auth from "../../Auth";
import { useHistory } from "react-router-dom";

const initialValues = { email: "", password: "" };


const errorSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be 8 characters or longer")
    .required("Password is required")
});

const Login = () => {
  const history = useHistory();

  return (
    <div className="login">
      <h1 className="login__header">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={errorSchema}
        onSubmit={(values, actions) => {
          console.log(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          auth.login(() => {
            history.push("/");
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login__form">
            <div className="field">
              <label htmlFor="mail">Email</label>
              <Field name="email" type="email" />
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
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
