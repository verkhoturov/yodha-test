'use client';

import React from 'react';

import cn from 'classnames';

import styles from './TimeInput.module.css';

import { SelectInput } from '../SelectInput';

const hours = new Array(24)
  .fill(0)
  .map((_value, index) => (index < 10 ? '0' + index : index.toString()));

const minutes = new Array(60)
  .fill(0)
  .map((_value, index) => (index < 10 ? '0' + index : index.toString()));

export const TimeInput: React.FC<{ className?: string; name?: string }> = ({ className, name }) => {
  const hourName = name ? `${name}.hour` : 'hour';
  const minuteName = name ? `${name}.minute` : 'minute';

  return (
    <div className={cn(styles.wrap, className)}>
      <SelectInput
        className={styles.input}
        label="Hour"
        name={hourName}
        placeholder="HH"
        options={hours}
      />
      <span className={styles.semicolon}>:</span>
      <SelectInput
        className={styles.input}
        label="Minute"
        name={minuteName}
        placeholder="MM"
        options={minutes}
      />
    </div>
  );
};
