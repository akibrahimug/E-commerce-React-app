import React, { useState, useEffect } from "react";
import FormInput from "../formInput/formin.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  SignInContainer,
  Option,
  Heading,
  ButtonConatainer,
} from "./sign-in.styles";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  // signInWithGooglePopup,
  signInWithGoogleRedirect,
  signInUserWithEmailAndPasswords,
} from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInUserWithEmailAndPasswords(email, password);
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        // if err.code === "auth/user-not-found"
        case "auth/user-not-found":
          // run this
          alert("User does not exist");
          // if the above is true then dont run the rest
          break;
        // if the first id false but err.code === "auth/wrong-password"
        case "auth/wrong-password":
          // run hthis
          alert("Invalid password");
          break;
        default:
          console.log(err);
      }
    }
  };

  useEffect(() => {
    async function getRedirect() {
      await getRedirectResult(auth);
    }
    getRedirect();
  }, []);

  // It creates a POPUP window
  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  return (
    <SignInContainer>
      <Heading>Do you already have an account</Heading>
      <h4>SignIn with your email and password</h4>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonConatainer>
          <Button type="submit">Sign In</Button>
          <Option>OR</Option>
          {/* <button onClick={logGoogleUser}> Sign In with Google</button> */}
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type="button"
            onClick={signInWithGoogleRedirect}
          >
            {" "}
            SignIn with Google
          </Button>
        </ButtonConatainer>
      </form>
    </SignInContainer>
  );
}

export default SignIn;
