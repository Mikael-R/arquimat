import React from 'react';
import SelectDropDown, {
  SelectProps as SelectDropDownProps
} from 'react-dropdown-select';

import './styles.css';

interface SelectProps extends SelectDropDownProps<any> {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  ...rest
}: SelectProps) => (
  <div className="select-block">
    <label>{label}</label>
    <SelectDropDown
      required
      separator
      searchable={false}
      style={{ borderRadius: '0.8rem' }}
      color="var(--color-primary)"
      options={options}
      {...rest}
    />
  </div>
);

export default Select;
