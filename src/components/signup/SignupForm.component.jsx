import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from '../form_input/FormInput.component';
import Button from '../button/Button.component';

import './signup_form.styles.scss';

// Set default state values
const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignupForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match.');
			return;
		}
		try {
			const user = await createAuthUserWithEmailAndPassword(
				email,
				password,
				displayName
			);
			alert(`User successfully created!`);
			setFormFields(defaultFormFields);
		} catch (error) {
			console.error('Error creating user: ', error);
			alert('Failed to create user. Please try again.');
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='signup-form-container'>
    <h2>Don't have an account?</h2>
			<span>Sign up with your email and password.</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label='Display Name'
          type='text'
          required
					onChange={handleChange}
					name='displayName'
					value={displayName}
				/>
				
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
				
        <FormInput
					label='Confirm Password'
          type='password'
          required
					onChange={handleChange}
					name='confirmPassword'
					value={confirmPassword}
				/>
        <Button type='submit'>Sign Up</Button>
			</form>
		</div>
	);
};

export default SignupForm;
