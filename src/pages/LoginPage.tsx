import React from 'react';
import './LoginPage.scss';
import instagramLogo from '../instagram-logo.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className='login-form-wrapper'>
      <div className='login-form'>
        <div className='login-form__box'>
          <img
            className='login-form__logo'
            src={instagramLogo}
            alt='Instagram'
          />

          <div className='login-form__content-wrapper'>
            <input
              className='login-form__input'
              placeholder='Benutzername oder E-Mail'
            />
            <input className='login-form__input' placeholder='Passwort' />
            <div className='login-form__button-wrapper'>
              <button className='login-form__button'>Anmelden</button>
            </div>
          </div>
        </div>

        <div className='login-form__box'>
          <div className='login-form__redirect-register__text'>
            Du hast kein Konto?{' '}
            <Link
              className='login-form__redirect-register__link'
              to='/register'
            >
              Registrieren
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
