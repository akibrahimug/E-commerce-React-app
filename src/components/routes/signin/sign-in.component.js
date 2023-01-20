import React, { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  // signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../../utils/firebase/firebase.utils";
import Signup from "../../signup/sign-up.component";

function Signin() {
  useEffect(() => {
    async function getRedirect() {
      const res = await getRedirectResult(auth);
      if (res) {
        const userDocRef = await createUserDocumentFromAuth(res.user);
      }
    }
    getRedirect();
  }, []);

  // It creates a POPUP window
  // const logGoogleUser = async () => {
  //   const { user } = await signInWithGooglePopup();
  //   const userDocRef = await createUserDocumentFromAuth(user);
  // };

  return (
    <div>
      <h1>sign in page</h1>
      {/* <button onClick={logGoogleUser}> Sign In with Google</button> */}
      <button onClick={signInWithGoogleRedirect}>
        {" "}
        Sign In with Google Redirect
      </button>
      <Signup />
    </div>
  );
}

export default Signin;
