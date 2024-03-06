import Signup from "../../components/signup/sign-up.component";
import SignIn from "../../components/signin/sign-in.components";
import { AuthContainer } from "./auth.style";
function Signin() {
  return (
    <AuthContainer>
      <SignIn />
      <Signup />
    </AuthContainer>
  );
}

export default Signin;
