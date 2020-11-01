import React, { HTMLAttributes } from 'react';

import './styles.css';

interface LabelKeyValueProps extends HTMLAttributes<HTMLSpanElement> {
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
    <span style={{ width: title.length * 10 }} {...rest}>
      {content}
    </span>
  </div>
);

export default LabelKeyValue;
