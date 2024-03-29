/* eslint-disable no-alert */
import React, { useState } from 'react'
import // createAuthUserWithEmailAndPassword,
// createUserDocumentFromAuth,
'../../utils/firebase/firebase.utils'
import FormInput from '../formInput/formin.component'
import { Heading, SignUpContainer } from './sign-up.styles'
import Button from '../button/button.component'
import { signUpStart } from '../../store/user/user.action'
import { useDispatch } from 'react-redux'
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

function Signup() {
  const dispatch = useDispatch()
  // add default values of the form fields in state
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  //   set the form fields change event handler
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormFields({ ...formFields, [name]: value })
  }

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Please make sure your confirm password matches the password')
    }
    try {
      // const { user } = await createAuthUserWithEmailAndPassword(email, password)
      // await createUserDocumentFromAuth(user, { displayName })
      dispatch(signUpStart(email, password, displayName))
      resetFormFields()
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('This user already exists')
      }
    }
  }

  return (
    <SignUpContainer>
      <Heading>Dont have an accout?</Heading>
      <h4>Sign up with your email and password</h4>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          required
          type='text'
          onChange={handleChange}
          name='displayName'
          value={displayName}
        />
        <FormInput
          label='Email'
          required
          type='email'
          onChange={handleChange}
          name='email'
          value={email}
        />
        <FormInput
          label='Password'
          required
          type='password'
          onChange={handleChange}
          name='password'
          value={password}
        />
        <FormInput
          label='Confirm Password'
          required
          type='password'
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default Signup
