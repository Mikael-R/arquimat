/* eslint-disable react/require-default-props */
import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  shouldBreakLineBetweenLabelAndInput?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  shouldBreakLineBetweenLabelAndInput,
  ...rest
}: InputProps) => (
  <div
    className="input-block"
    style={
      shouldBreakLineBetweenLabelAndInput
        ? { flexDirection: 'column', alignItems: 'flex-start' }
        : undefined
    }
  >
    <label htmlFor={name}>{label}</label>
    <input type="text" id={name} {...rest} />
  </div>
);

export default Input;
