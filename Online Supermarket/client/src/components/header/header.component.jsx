import React from 'react';

import './header.styles.scss';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { connect } from 'react-redux';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { setCurrentUser } from '../../redux/user/user.actions';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

const Header = ({ currentUser, hidden, setCurrentUser }) => {

  const signoutHandler = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  }

  return (
    <div className="header">
      <Link className='logo-container' to='/'>
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to='/'>
          SHOP
      </Link>
        <Link className="option" to='/contact'>
          CONTACT
      </Link>
        {
          currentUser ?
            (<div className="option" onClick={() => signoutHandler()}>SIGN OUT</div>)
            : (<Link className="option" to="/signin">SIGN IN</Link>)
        }
        <CartIcon />
      </div>
      {(hidden) ? null : (<CartDropdown />)}
    </div>
  )
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);