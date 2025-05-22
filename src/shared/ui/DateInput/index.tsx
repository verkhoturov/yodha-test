import React from 'react';

import cn from 'classnames';

import styles from './DateInput.module.css';

import { SelectInput } from '../SelectInput';

const days = new Array(31).fill(0).map((_value, index) => {
  const day = index + 1;

  return day < 10 ? '0' + day : day.toString();
});

const months = new Array(12).fill(0).map((_value, index) => {
  const month = index + 1;

  return month < 10 ? '0' + month : month.toString();
});

const years = new Array(94).fill(1930).map((value, index) => (value + index).toString());

export const DateInput: React.FC<{ className?: string; name?: string }> = ({ className, name }) => {
  const dayName = name ? `${name}.day` : 'day';
  const monthName = name ? `${name}.month` : 'month';
  const yearName = name ? `${name}.year` : 'year';

  return (
    <div className={cn(styles.wrap, className)}>
      <SelectInput label="Day" name={dayName} placeholder="DD" options={days} />
      <SelectInput label="Month" name={monthName} placeholder="MM" options={months} />
      <SelectInput label="Year" name={yearName} placeholder="YYYY" options={years} />
    </div>
  );
};
