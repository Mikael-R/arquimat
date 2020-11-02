/* eslint-disable react/require-default-props */
import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  shouldBreakLineBetweenLabelAndCheckBox?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  name,
  shouldBreakLineBetweenLabelAndCheckBox,
  ...rest
}: CheckBoxProps) => (
  <div
    className="checkbox-block"
    style={
      shouldBreakLineBetweenLabelAndCheckBox
        ? { flexDirection: 'column', alignItems: 'flex-start' }
        : undefined
    }
  >
    <label htmlFor={name}>{label}</label>
    <input type="checkbox" name={name} id={name} {...rest} />
  </div>
);

export default CheckBox;
