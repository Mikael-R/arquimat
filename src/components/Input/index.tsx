/* eslint-disable react/require-default-props */
import React, { InputHTMLAttributes } from 'react';

import './styles.css';
import { InputBlock } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  shouldBreakLineBetweenLabelAndInput?: boolean;
  focusLineColor?: string | number;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  shouldBreakLineBetweenLabelAndInput,
  focusLineColor = 'var(--color-primary-light)',
  ...rest
}: InputProps) => (
  <InputBlock
    className="input-block"
    theme={{ focusLineColor }}
    style={
      shouldBreakLineBetweenLabelAndInput
        ? { flexDirection: 'column', alignItems: 'flex-start' }
        : undefined
    }
  >
    <label htmlFor={name}>{label}</label>
    <input type="text" id={name} {...rest} />
  </InputBlock>
);

export default Input;
