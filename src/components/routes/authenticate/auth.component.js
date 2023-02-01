import Signup from "../../signup/sign-up.component";
import SignIn from "../../signin/sign-in.components";
import "./auth.style.scss";
import { UserContext } from "../../context/user.context";
import { useContext } from "react";
function Signin() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="auth-container">
      <SignIn />
      <Signup />
    </div>
  );
}

export default Signin;
