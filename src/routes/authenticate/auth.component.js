import Signup from "../../components/signup/sign-up.component";
import SignIn from "../../components/signin/sign-in.components";
import "./auth.style.scss";
import { UserContext } from "../../components/context/user.context";
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
