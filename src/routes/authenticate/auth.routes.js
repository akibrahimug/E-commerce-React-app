import Signup from "../../components/signup/sign-up.component";
import SignIn from "../../components/signin/sign-in.components";
import { AuthContainer } from "./auth.style";
import { UserContext } from "../../components/context/user.context";
import { useContext } from "react";
function Signin() {
  const { currentUser } = useContext(UserContext);
  return (
    <AuthContainer>
      <SignIn />
      <Signup />
    </AuthContainer>
  );
}

export default Signin;
