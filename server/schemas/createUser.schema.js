const Yup = require("yup");

const createUserSchema = Yup.object().shape({
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

module.exports = {
  createUserSchema
};
