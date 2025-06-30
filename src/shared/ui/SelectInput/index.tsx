import React from 'react';

import cn from 'classnames';

import styles from './SelectInput.module.css';

import { TextInput, TextInputProps } from '../TextInput';

import { ArrowIcon } from '@/shared/ui/Icons';

type SelectInputProps = {
  options: Array<string | number>;
} & TextInputProps;

export const SelectInput: React.FC<SelectInputProps> = ({
  className,
  options,
  placeholder,
  ...props
}) => {
  return (
    <TextInput
      className={cn(styles.input, className)}
      wrapClassName={styles.wrapInput}
      as="select"
      suffixIcon={<ArrowIcon className={styles.arrow} />}
      required
      defaultValue={placeholder}
      {...props}>
      <option value={placeholder} disabled>
        {placeholder}
      </option>
      {options.map((value: string | number) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </TextInput>
  );
};
