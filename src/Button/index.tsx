import React from 'react';
import './style.scss';
import FadeLoader from 'react-spinners/FadeLoader';

interface Props {
  testId?: string;
  loading: boolean;
  htmlInputProps?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}

const Button: React.FC<Props> = ({
  htmlInputProps,
  testId,
  loading,
  children,
}) => {
  return (
    <button {...htmlInputProps} data-testid={testId} className={'button'}>
      {loading ? (
        <div className='button__spinner'>
          <FadeLoader />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
