import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface LabelKeyValueProps extends InputHTMLAttributes<HTMLInputElement> {
  title: string;
  content: string;
}

const LabelKeyValue: React.FC<LabelKeyValueProps> = ({
  title,
  content,
  ...rest
}: LabelKeyValueProps) => (
  <div className="label-key-value-block">
    <label>{title}</label>
    <input
      readOnly
      style={{ width: title.length * 10 }}
      {...rest}
      value={content}
    />
  </div>
);

export default LabelKeyValue;
