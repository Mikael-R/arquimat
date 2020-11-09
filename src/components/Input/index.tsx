import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  shouldBreakLineBetweenLabelAndInput?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
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
    <label>{label}</label>
    <input type="text" {...rest} />
  </div>
);

export default Input;
