import React from 'react';
import './style.scss';
import ClipLoader from 'react-spinners/ClipLoader';

export enum ButtonType {
  PrimaryContained,
  SecondaryContained,
  PrimaryText,
}

interface Props {
  testId?: string;
  loaderTestId?: string;
  loading: boolean;
  htmlInputProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  type?: ButtonType;
}

// TODO: Maybe add tests for new button type
const Button: React.FC<Props> = ({
  htmlInputProps,
  testId,
  loaderTestId,
  loading,
  children,
  type = ButtonType.PrimaryContained,
}) => {
  return (
    <button
      {...htmlInputProps}
      data-testid={testId}
      className={`button 
      ${
        type === ButtonType.PrimaryContained ? 'button--primary-contained' : ' '
      }
      ${
        type === ButtonType.SecondaryContained
          ? 'button--secondary-contained'
          : ' '
      }
      ${type === ButtonType.PrimaryText ? 'button--primary-text' : ' '}
      ${loading ? 'button--loading' : ' '}`}
    >
      {loading && (
        <div className='button__spinner' data-testid={loaderTestId}>
          <ClipLoader
            size='1em'
            color={`
          ${type === ButtonType.PrimaryContained ? 'white' : ''}
          ${type === ButtonType.SecondaryContained ? 'black' : ''}
          ${type === ButtonType.PrimaryText ? 'black' : ''}`}
          />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
