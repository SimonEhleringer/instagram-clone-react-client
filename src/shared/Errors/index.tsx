import React from 'react';
import './style.scss';

interface Props {
  testId: string;
  errors: string[];
}

const Errors: React.FC<Props> = ({ testId, errors }) => {
  return (
    <div data-testid={testId}>
      {errors.map((error, index) => {
        const top = errors.length >= 2 && index === 0;
        const bottom = errors.length >= 2 && index === errors.length - 1;
        const middle =
          errors.length >= 3 && index !== 0 && index !== errors.length - 1;

        return (
          <p
            key={index}
            className={`errors__error ${top ? 'errors__error--top' : ''} ${
              middle ? 'errors__error--middle' : ''
            } ${bottom ? 'errors__error--bottom' : ''}`}
          >
            {error}
          </p>
        );
      })}
    </div>
  );
};

export default Errors;
