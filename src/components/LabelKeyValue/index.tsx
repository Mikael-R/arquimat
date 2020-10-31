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
    <span {...rest}>{content}</span>
  </div>
);

export default LabelKeyValue;
