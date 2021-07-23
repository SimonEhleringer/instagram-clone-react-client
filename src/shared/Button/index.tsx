import React from 'react';
import { textOnPrimary, textPrimary } from '../../scss/variables';
import Loader from '../Loader';
import './style.scss';

export enum ButtonType {
  PrimaryContained,
  SecondaryContained,
  PrimaryText,
}

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  isLoading?: boolean;
  buttonType?: ButtonType;
  loaderDataTestId?: string;
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  buttonType = ButtonType.PrimaryContained,
  loaderDataTestId = 'button-loader',
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`button ${
        buttonType === ButtonType.PrimaryContained
          ? 'button--primary-contained'
          : ''
      } ${
        buttonType === ButtonType.SecondaryContained
          ? 'button--secondary-contained'
          : ''
      } ${
        buttonType === ButtonType.PrimaryText ? 'button--primary-text' : ' '
      } ${isLoading ? 'button--loading' : ''}`}
      disabled={isLoading || disabled}
      {...rest}
    >
      {isLoading && (
        <div className='button__spinner' data-testid={loaderDataTestId}>
          <Loader
            size='15px'
            color={`
          ${buttonType === ButtonType.PrimaryContained ? textOnPrimary : ''}
          ${buttonType === ButtonType.SecondaryContained ? textPrimary : ''}
          ${buttonType === ButtonType.PrimaryText ? textPrimary : ''}`}
          />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
