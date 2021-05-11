import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import instagramLogo from '../assets/images/logo.png';
import './style.scss';

interface Props {
  subTitle?: string;
  submitButtonCaption: string;
  redirectText: string;
  redirectButtonText: string;
  redirectTo: string;
}

const AuthenticationForm: React.FC<Props> = ({
  subTitle,
  submitButtonCaption,
  redirectText,
  redirectButtonText,
  redirectTo,
  children,
}) => {
  return (
    <div className='authentication-form'>
      <div className='authentication-form__box'>
        <img
          className={
            subTitle
              ? 'authentication-form__logo'
              : 'authentication-form__logo--margin-bottom'
          }
          src={instagramLogo}
          alt='Instagram'
        />

        <div className='authentication-form__content-wrapper'>
          {subTitle && (
            <p className='authentication-form__sub-title'>{subTitle}</p>
          )}

          {children}

          <div className='authentication-form__submit-button'>
            <Button caption={submitButtonCaption} />
          </div>
        </div>
      </div>

      <div className='authentication-form__box'>
        <div className='authentication-form__redirect-text'>
          {redirectText}{' '}
          <Link className='authentication-form__redirect-link' to={redirectTo}>
            {redirectButtonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
