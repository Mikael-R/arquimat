/* eslint-disable react/require-default-props */
import React, { SelectHTMLAttributes } from 'react';

import './styles.css';
import { SelectBlock } from './styles';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  focusLineColor?: string | number;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  focusLineColor = 'var(--color-primary-light)',
  ...rest
}: SelectProps) => (
  <SelectBlock theme={{ focusLineColor }} className="select-block">
    <label htmlFor={name}>{label}</label>
    <select value="" onChange={() => null} id={name} {...rest}>
      <option value="" onChange={() => null} disabled hidden>
        Selecione uma opção
      </option>
      {options.map((option, index) => (
        <option key={index as number} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </SelectBlock>
);

export default Select;
