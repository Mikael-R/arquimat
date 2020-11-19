import React, { memo, InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...rest }: InputProps) => (
  <div className="input-block">
    <label>{label}</label>
    <input type="text" {...rest} />
  </div>
);

export default memo(Input);
