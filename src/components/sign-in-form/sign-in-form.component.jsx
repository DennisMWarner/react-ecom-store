import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  creatUserDocFromAuth,
  signInWithGooglePopup,
  signInUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "../sign-in-form/sign-in-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const handleFieldChange = (event) => {
    console.log(formFields);
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await creatUserDocFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signInUserWithEmailAndPassword(email, password);
      alert(res.user.email + "  log in successful!");
      resetFormFields();
    } catch (err) {
      err.value === "auth/user-not-found" || err.value === "auth/wrong-password"
        ? alert(
            "please check your wmail and password and try logging in again."
          )
        : alert("something bad happened. Please try logging in again.");
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>

      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button buttonType="" type="submit">
            Sign In
          </Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
