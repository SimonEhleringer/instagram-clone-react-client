import React, { FC } from "react";
import "./style.scss";

interface Props {
  testId: string;
  htmlInputProps: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  innerRef?: React.LegacyRef<HTMLInputElement>;
}

const Input: FC<Props> = ({ testId, htmlInputProps, innerRef }) => {
  return (
    <input
      className="input"
      ref={innerRef}
      {...htmlInputProps}
      data-testid={testId}
    />
  );
};

export default Input;
