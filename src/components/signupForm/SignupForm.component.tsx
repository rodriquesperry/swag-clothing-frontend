import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form_input/FormInput.component';
import Button from '../button/Button.component';

import { signUpStart } from '../../store/user/user.action';
import './signup_form.styles.scss';
import { BUTTON_TYPE_CLASSES } from '../button/button.types';

// Set default state values
const defaultFormFields = {
	displayName: '',
	email: '',
	password: '',
	confirmPassword: '',
};

const SignupForm = () => {
	const dispatch = useDispatch();
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();

		if (password !== confirmPassword) {
			alert('Passwords do not match.');
			return;
		}

    console.log('DisplayName::', displayName);
    
		try {
			dispatch(signUpStart(email, password, displayName));
			alert(`User successfully created!`);
			setFormFields(defaultFormFields);
		} catch (error) {
			console.error('Error creating user: ', error);
			alert('Failed to create user. Please try again.');
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
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
				<Button buttonType={BUTTON_TYPE_CLASSES.default} type='submit' children={'Sign Up'} />
			</form>
		</div>
	);
};

export default SignupForm;
