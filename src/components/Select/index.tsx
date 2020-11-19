import React, { useState, memo } from 'react';
import SelectDropDown, {
  SelectProps as SelectDropDownProps
} from 'react-dropdown-select';

import './styles.css';

interface ISelectProps
  extends SelectDropDownProps<{ value: string; label: string }> {
  label: string;
  defaultValues?: string[];
}

const Select: React.FC<ISelectProps> = ({
  label,
  defaultValues = [],
  values = [],
  options,
  ...rest
}: ISelectProps) => {
  const [optionsSelected] = useState(
    options.filter(({ value }) => defaultValues.includes(value))
  );

  if (defaultValues.length && optionsSelected.length) values = optionsSelected;

  return (
    <div className="select-block">
      <label>{label}</label>
      <SelectDropDown
        separator
        searchable={false}
        placeholder=""
        options={options}
        values={values}
        style={{ borderRadius: '0.8rem' }}
        color="var(--color-primary)"
        {...rest}
      />
    </div>
  );
};

export default memo(Select);
