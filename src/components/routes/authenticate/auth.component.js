import Signup from "../../signup/sign-up.component";
import SignIn from "../../signin/sign-in.components";
import "./auth.style.scss";
function Signin() {
  return (
    <div className="auth-container">
      <SignIn />
      <Signup />
    </div>
  );
}

export default Signin;
