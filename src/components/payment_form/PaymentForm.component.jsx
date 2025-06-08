import { CardElement } from "@stripe/react-stripe-js"
import Button from "../button/Button.component"
import  { BUTTON_TYPE_CLASSES, BUTTON_TYPE_CLASSESS } from '../button/button.types'; 

const PaymentForm = () => {
  return (
    <div>
    <CardElement  />
    <Button buttonType={BUTTON_TYPE_CLASSES.inverted} >
      Pay now
    </Button>
    </div>
  )
}

export default PaymentForm