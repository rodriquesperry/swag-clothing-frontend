import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

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
      const user = await createAuthUserWithEmailAndPassword(email, password, displayName);
      console.log('user::', user);
      alert(`User successfully created!`);
      setFormFields(defaultFormFields)
    } catch (error) {
      console.error('Error creating user: ', error);
      alert('Failed to create user. Please try again.')
    }
  }

  const handleChange = (e) => {    
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value })
  };
  
	return (
		<>
			<h1>Sign up with your email and password.</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor=''>Display Name</label>
				<input type='text' required onChange={handleChange} name='displayName' value={displayName}/>

				<label htmlFor=''>Email</label>
				<input type='email' required onChange={handleChange} name='email' value={email}/>

				<label htmlFor=''>Password</label>
				<input type='password' required onChange={handleChange} name='password' value={password}/>

				<label htmlFor=''>Confirm Password</label>
				<input type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword}/>

				<button type='submit'>Sign Up</button>
			</form>
		</>
	);
};

export default SignupForm;
