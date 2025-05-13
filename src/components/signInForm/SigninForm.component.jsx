import { useState } from 'react';
import { signInUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form_input/FormInput.component';
import Button from '../button/Button.component';

import './signin_form.styles.scss';

// Set default state values
const defaultFormFields = {
	email: '',
	password: '',
};

const SigninForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { user } = await signInUserWithEmailAndPassword(email, password);

			if (user) {
				alert(`User successfully signed in!`);
				setFormFields(defaultFormFields);
			}
		} catch (error) {
			console.error('Error signing in user: ', error);
			alert('Failed to sign in user. Please try again.');
		}
	};

  const logGoogleUser = async () => {
		await signInWithGooglePopup();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='signin-form-container'>
			<h2>Already have an account?</h2>

			<span>Sign in with your email and password.</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Email'
					type='email'
					required
					onChange={handleChange}
					name='email'
					value={email}
				/>

				<FormInput
					label='Password'
					type='password'
					required
					onChange={handleChange}
					name='password'
					value={password}
				/>

				<div className='signin-form-buttons'>
					<Button type='submit'>Sign In</Button>
					<Button type='button' onClick={logGoogleUser} buttonType='google'>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SigninForm;
