import {
  InvertedButton,
  GoogleSigninButton,
  BaseButton,
} from "./button.styles.js";
export const BUTTON_TYPE_CLASSES = {
  google: "google-sign-in",
  inverted: "inverted",
  base: "base",
};

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSigninButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType]);
function Button({ children, buttonType, ...other }) {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...other}>{children}</CustomButton>;
}

export default Button;
