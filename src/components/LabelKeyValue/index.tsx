import React, { HTMLAttributes } from 'react';

import './styles.css';

interface LabelKeyValueProps extends HTMLAttributes<HTMLSpanElement> {
  title: string;
  value: string | number;
}

const LabelKeyValue: React.FC<LabelKeyValueProps> = ({
  title,
  value,
  ...rest
}: LabelKeyValueProps) => (
  <div className="label-key-value-block">
    <label>{title}</label>
    <span style={{ width: title.length * 10 }} {...rest}>
      {value}
    </span>
  </div>
);

export default LabelKeyValue;
