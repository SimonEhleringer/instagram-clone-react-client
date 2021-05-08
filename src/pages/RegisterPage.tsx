import React from 'react';
import instagramLogo from '../instagram-logo.png';
import { Link } from 'react-router-dom';
import './RegisterPage.scss';

const RegisterPage = () => {
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
            <p className='login-form__paragraph'>
              Registriere dich, um die Fotos und Videos deiner Freunde zu sehen.
            </p>

            <input className='login-form__input' placeholder='E-Mail Adresse' />
            <input
              className='login-form__input'
              placeholder='Vollständiger Name'
            />

            <input className='login-form__input' placeholder='Benutzername' />

            <input className='login-form__input' placeholder='Passwort' />
            <div className='login-form__button-wrapper'>
              <button className='login-form__button'>Anmelden</button>
            </div>
          </div>
        </div>

        <div className='login-form__box'>
          <div className='login-form__redirect-register__text'>
            Du hast ein Konto?{' '}
            <Link
              className='login-form__redirect-register__link'
              to='/register'
            >
              Melde dich an.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
