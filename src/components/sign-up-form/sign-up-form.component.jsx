import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  creatUserDocFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "../sign-up-form/sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const handleFieldChange = (event) => {
    console.log(formFields);
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await creatUserDocFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("Cannot create user;  Email already in use.");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="display name"
          onChange={handleFieldChange}
          name="displayName"
          type="text"
          value={displayName}
          required
        />

        <FormInput
          label="email"
          onChange={handleFieldChange}
          name="email"
          type="email"
          value={email}
          required
        />

        <FormInput
          label="password"
          onChange={handleFieldChange}
          name="password"
          type="password"
          value={password}
          required
        />

        <FormInput
          label="confirm password"
          onChange={handleFieldChange}
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          required
        />

        <Button buttonType="google" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
