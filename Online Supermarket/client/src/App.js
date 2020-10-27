import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignUpPage from './pages/signin-signup/signin-signup.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Contact from './pages/contact/contact.component';

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {

  componentDidMount() {
    const { setCurrentUser, collectionsArray } = this.props;

    const currentUser = localStorage.getItem('user');
    if (currentUser) setCurrentUser(currentUser);
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/contact' component={Contact} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.props.currentUser ?
                (<Redirect to="/" />) :
                (<SignInSignUpPage />)
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
