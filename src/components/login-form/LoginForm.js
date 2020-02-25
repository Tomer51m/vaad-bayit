import React from "react";
import "./loginForm.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { signin } from "../../store/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.users, shallowEqual);
  const initialValues = { email: "", password: "" };
  const errorSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be 8 characters or longer")
      .required("Password is required")
  });

  async function handleSubmit(values, actions) {
    actions.setSubmitting(true);
    dispatch(signin(values));
    setTimeout(() => {
      actions.setSubmitting(false);
    }, 2000);
  }
  return (
    <div className="login">
      <h1 className="login__header">Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={errorSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="login__form">
            <div className="field">
              <label htmlFor="mail">Email</label>
              <ErrorMessage
                name="email"
                render={msg => <span className="error">{msg}</span>}
              />
              <Field name="email" type="email" />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <ErrorMessage
                name="password"
                render={msg => <span className="error">{msg}</span>}
              />
              <Field name="password" type="password" />
            </div>
            <div>
              {user && user.error ? (
                <span className="error">{user.error}</span>
              ) : null}
            </div>
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
