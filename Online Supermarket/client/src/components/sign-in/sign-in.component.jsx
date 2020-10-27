import React from 'react';

// import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

import { Redirect } from 'react-router-dom';

import { login } from '../../api/api-labcourse';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirect: false
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const res = await login(email, password);

      if (!res.data.loginSuccess) {
        alert("Something went wrong");
        return;
      }

      const { userId, token } = res.data;
      const currentUser = { userId, token }

      localStorage.setItem('user', JSON.stringify(currentUser));
      this.props.setCurrentUser(currentUser)

      this.setState({ email: '', password: '', redirect: true })
    } catch (err) { console.log(err) }
  }

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }

    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            handleChange={this.handleChange}
            label="Email"
            value={this.state.email}
            required
          />
          <FormInput
            type="password"
            name="password"
            handleChange={this.handleChange}
            label="Password"
            value={this.state.password}
            required
          />

          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
          </div>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);