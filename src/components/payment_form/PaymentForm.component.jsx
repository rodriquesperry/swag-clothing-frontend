// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import Button from '../button/Button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.types';

import './payment_form.styles.scss';

const PaymentForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const amount = useSelector(selectCartTotal);
	const currentUser = useSelector(selectCurrentUser);

	// const [isProcessingPayment, setIsProcessingPayment] = useState(false);

	const paymentHandler = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) return;
		// setIsProcessingPayment(true);

		const isDev = import.meta.env.DEV;
		const apiUrl = isDev
			? 'http://localhost:3000/api/create-payment-intent'
			: '/api/create-payment-intent';

		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				amount: amount * 100,
				user: {
					name: currentUser?.displayName ?? 'Guest',
					// email: currentUser?.email ?? '',
				},
			}), // Our value is whole numbers while stripe stores 1000 as 10.00
		}).then((res) => res.json());

		const clientSecret = response.paymentIntent.client_secret;

		const paymentResult = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: currentUser ? currentUser.displayName : 'Guest',
				},
			},
		});

		// setIsProcessingPayment(false);

		if (paymentResult.error) {
			alert(paymentResult.error);
		} else {
			if (paymentResult?.paymentIntent?.status === 'succeeded') {
				alert('Payment Succeeded');
			}
		}
	};

	return (
		<div className='payment-form-container'>
			<form onSubmit={paymentHandler} className='form-container'>
				<h2>Credit Card Payment:</h2>
				<CardElement />
				{/* <Button
					children={'Pay Now'}
					buttonType={BUTTON_TYPE_CLASSES.inverted}
				/> */}
			</form>
		</div>
	);
};

export default PaymentForm;
