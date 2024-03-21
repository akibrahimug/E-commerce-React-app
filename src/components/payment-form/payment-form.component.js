/* eslint-disable no-alert */
/* eslint-disable no-console */
import { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles'
import { useSelector } from 'react-redux'
import { selectCartTotal } from '../../store/cart/cart.selector'
import { selectCurrentUser } from '../../store/user/user.selector'
import { BUTTON_TYPE_CLASSES } from '../button/button.component'
const PaymentForm = () => {
  const currentUser = useSelector(selectCurrentUser)
  const amount = useSelector(selectCartTotal)
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const paymentHandler = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setIsProcessingPayment(true)
    const response = await fetch('/.netlify/functions/create-payment-intent', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: amount * 100 }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error))

    // get the client secret
    const {
      paymentIntent: { client_secret },
    } = response

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : 'Guest',
        },
      },
    })
    setIsProcessingPayment(false)
    if (paymentResult.error) {
      alert(paymentResult.error)
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      alert('PAYMENT SUCCESSFUL')
    }
  }
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted} isLoading={isProcessingPayment}>
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm
