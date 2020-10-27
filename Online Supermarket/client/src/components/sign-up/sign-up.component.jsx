import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUp } from '../../api/api-labcourse';

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      lastname: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { name, lastname, email, phone, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    try {
      const res = await signUp(this.state);

      if (!res.data.success) {
        alert("Couldn't register!");
        return;
      }

      console.log(res);
      alert("Registered successfully!")

      this.setState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      })
    } catch (err) { console.log(err); }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value })
  }

  render() {
    const { name, lastname, email, phone, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account!</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up form" onSubmit={this.handleSubmit}>
          <FormInput
            type='text'
            name='name'
            value={name}
            onChange={this.handleChange}
            label='First Name'
            required
          />
          <FormInput
            type='text'
            name='lastname'
            value={lastname}
            onChange={this.handleChange}
            label='Last Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='phone'
            name='phone'
            value={phone}
            onChange={this.handleChange}
            label='Phone'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    )
  }
}

export default SignUp;