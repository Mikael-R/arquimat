import React, { memo, InputHTMLAttributes } from 'react';

import './styles.css';

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  shouldBreakLineBetweenLabelAndCheckBox?: boolean;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
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
    <label>{label}</label>
    <input type="checkbox" {...rest} />
  </div>
);

export default memo(CheckBox);
