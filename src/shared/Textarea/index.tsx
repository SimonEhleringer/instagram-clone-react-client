import React from 'react';
import './style.scss';

export interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

const Textarea: React.FC<TextareaProps> = (props) => {
  return <textarea className='textarea' {...props} />;
};

export default Textarea;
