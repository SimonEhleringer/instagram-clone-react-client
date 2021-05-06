import React from 'react';
import './LoginPage.scss';
import instagramLogo from '../instagram-logo.png';

const LoginPage = () => {
  return (
    <div className='login-form-wrapper'>
      <div className='login-form'>
        <div className='login-form__box'>
          <img src={instagramLogo} alt='Instagram' />
          <input />
          <input />
        </div>
      </div>

      <div className='login-form__box'>Du hast kein Konto? Registrieren</div>
    </div>
  );
};

export default LoginPage;
