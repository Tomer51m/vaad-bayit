import React from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  residents: [
    {
      firstName: "",
      lastName: "",
      apartmentNumber: '',
      floorNumber: '',
      isOwner: false
    }
  ]
};

const errorSchema = Yup.object({
  residents: Yup.array().of(
    Yup.object({
      firstName: Yup.string().required("Requierd"),
      lastName: Yup.string().required("Requierd"),
      apartmentNumber: Yup.number().required("Requierd"),
      floorNumber: Yup.number().required("Requierd"),
      isOwner: Yup.boolean().required("Required")
    })
  )
});

const AddResidentsForm = () => (
  <div>
    <h1>Add Residents</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={errorSchema}
      onSubmit={(values, actions) => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <FieldArray name="residents">
            {({ push, remove }) => (
              <React.Fragment>
                {values.residents &&
                  values.residents.length > 0 &&
                  values.residents.map((resident, index) => (
                    <div className="userLine" key={index}>
                      <Field
                        name={`residents[${index}].firstName`}
                        type="text"
                        placeholder="First Name"
                      />
                      <ErrorMessage name={`residents[${index}].firstName`}>
                        {msg => <span>{msg}</span>}
                      </ErrorMessage>
                      <Field
                        name={`residents[${index}].lastName`}
                        type="text"
                        placeholder="Last Name"
                      />
                      <ErrorMessage name={`residents[${index}].lastName`}>
                        {msg => <span>{msg}</span>}
                      </ErrorMessage>
                      <Field
                        name={`residents[${index}].floorNumber`}
                        type="number"
                        placeholder="Floor"
                      />
                      <ErrorMessage name={`residents[${index}].floorNumber`}>
                        {msg => <span>Must add a floor number</span>}
                      </ErrorMessage>
                      <Field
                        name={`residents[${index}].apartmentNumber`}
                        type="number"
                        placeholder="Apartment Number"
                      />
                      <ErrorMessage
                        name={`residents[${index}].apartmentNumber`}
                      >
                        {msg => <span>Must add an apartment number</span>}
                      </ErrorMessage>
                      <Field
                        name={`residents[${index}].isOwner`}
                        component="select"
                        placeholder="Owner/Renting "
                      >
                        <option value="">Owner/Renting</option>
                        <option value="true">Owner</option>
                        <option value="false">Renting</option>
                      </Field>
                      <ErrorMessage name={`residents[${index}].isOwner`}>
                        {msg => <span>Pick "owner or renting</span>}
                      </ErrorMessage>
                      <button type="button" onClick={() => remove(index)}>
                        X
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      firstName: "",
                      lastName: "",
                      apartmentNumber: "",
                      floorNumber: "",
                      isOwner: false
                    })
                  }
                >
                  Add Resident
                </button>
              </React.Fragment>
            )}
          </FieldArray>
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default AddResidentsForm;
