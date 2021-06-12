import React from 'react';
import './style.scss';
import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  testId?: string;
  loaderTestId?: string;
  loading: boolean;
  htmlInputProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

const Button: React.FC<Props> = ({
  htmlInputProps,
  testId,
  loaderTestId,
  loading,
  children,
}) => {
  return (
    <button
      {...htmlInputProps}
      data-testid={testId}
      className={`button ${loading && 'button--loading'}`}
    >
      {loading && (
        <div className='button__spinner' data-testid={loaderTestId}>
          <ClipLoader size='1em' color='white' />
        </div>
      )}
      {children}
    </button>
  );
};

export default Button;
