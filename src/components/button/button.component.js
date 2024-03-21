/* eslint-disable react/prop-types */
import { InvertedButton, GoogleSigninButton, BaseButton, ButtonSpinner } from './button.styles.js'
export const BUTTON_TYPE_CLASSES = {
  google: 'google-sign-in',
  inverted: 'inverted',
  base: 'base',
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) =>
  ({
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSigninButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType])
function Button({ children, buttonType, isLoading, ...other }) {
  const CustomButton = getButton(buttonType)
  return (
    <CustomButton disabled={isLoading} {...other}>
      {isLoading ? <ButtonSpinner /> : children}
    </CustomButton>
  )
}

export default Button
