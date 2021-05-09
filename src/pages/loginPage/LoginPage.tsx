import React from 'react';
import './LoginPage.scss';
import instagramLogo from '../../instagram-logo.png';
import { Link } from 'react-router-dom';
import Input from '../../Input/Input';
import Button from '../../Button/Button';

const LoginPage = () => {
  return (
    <div className='login-form-wrapper'>
      <div className='login-form'>
        <div className='login-form__box'>
          <img
            className='login-form__logo login-form__margin-bottom'
            src={instagramLogo}
            alt='Instagram'
          />

          <div className='login-form__content-wrapper'>
            <Input placeholder='Benutzername oder E-Mail Adresse' />
            <Input type='password' placeholder='Passwort' />
            <div className='login-form__button-wrapper'>
              <Button caption='Anmelden' />
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
