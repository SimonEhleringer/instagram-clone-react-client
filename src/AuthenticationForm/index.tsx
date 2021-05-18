import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';
import instagramLogo from '../assets/images/logo.png';
import './style.scss';
import Errors from '../Errors';

interface Props {
  onSubmit: () => void;
  subTitle?: string;
  submitButtonCaption: string;
  redirectText: string;
  redirectButtonText: string;
  redirectTo: string;
  errors: string[];
}

const AuthenticationForm: React.FC<Props> = ({
  onSubmit,
  subTitle,
  submitButtonCaption,
  redirectText,
  redirectButtonText,
  redirectTo,
  children,
  errors,
}) => {
  // TODO: Loading animation
  return (
    <form
      data-testid='authentication-form'
      className='authentication-form'
      onSubmit={onSubmit}
    >
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
            <Button type='submit'>{submitButtonCaption}</Button>
          </div>

          {errors.length > 0 && (
            <div className='authentication-form__errors'>
              <Errors errors={errors} />
            </div>
          )}
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
    </form>
  );
};

export default AuthenticationForm;
