import React from "react";
import { Login } from "../../stores/actions";
import { connect } from "react-redux";

import styled from "styled-components";
import { Input, Icon } from "antd";
import { Formik, Form, Field, withFormik } from "formik";

import * as Yup from "yup";
import Link from "next/link";

const LoginField = ({ icon, field, form: { touched, errors }, ...props }) => {
  return (
    <div>
      <InputForm
        prefix={<Icon type={icon} style={{ color: "rgba(0,0,0,.25)" }} />}
        {...field}
        {...props}
        border={errors[field.name] ? "1px solid red" : null}
      />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched[field.name] && errors[field.name]}
      </div>
    </div>
  );
};

// const RegisterText = ({ signup, resetForm }) => {
//   return (
//     <div>
//       <a
//         onClick={() => {
//           signup();
//           resetForm();
//         }}
//       >
//         Register Now
//       </a>
//     </div>
//   );
// };

// const LoginComponent = ({ signup, isSubmitting, resetForm }) => {
//   return (
//     <Form>
//       <Field
//         type="text"
//         icon="user"
//         name="email"
//         component={LoginField}
//         placeholder="user"
//       />
//       <Field
//         type="password"
//         icon="lock"
//         name="password"
//         component={LoginField}
//         placeholder="password"
//       />
//       <RegisterText signup={signup} resetForm={resetForm} />

//       <button type="submit" disabled={isSubmitting}>
//         Submit
//       </button>
//     </Form>
//   );
// };

// const LoginEnhancedForm = withFormik({
//   handleSubmit: async (values, { props, setSubmitting }) => {
//     console.log(props);
//     await props.Login(values);
//   }
// })(LoginComponent);

const SignUp = ({ login }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field
            type="text"
            icon="user"
            name="email"
            component={LoginField}
            values={values.email}
          />
          <Field
            type="password"
            icon="lock"
            name="password"
            component={LoginField}
            values={values.password}
          />
          <a onClick={login}>test</a>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

class LoginContainer extends React.PureComponent {
  state = {
    login_page: true,
    signup_page: false
  };

  render() {
    // console.log(this.props);
    return (
      <>
        <Formik
          initialValues={{
            email: "",
            password: ""
          }}
          onSubmit={async (values, { setSubmitting }) => {
            this.props.Login(values);

            // console.log(values);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Field
                type="text"
                icon="user"
                name="email"
                component={LoginField}
                values={values.email}
              />
              <Field
                type="password"
                icon="lock"
                name="password"
                component={LoginField}
                values={values.password}
              />

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default connect(
  ({ auth }) => ({ auth }),
  { Login }
)(LoginContainer);

const InputForm = styled(Input)`
  width: 100%;
  height: 35px;
  border: ${props => props.border || "1px solid #ccc"};
  background-color: #fff;
`;
