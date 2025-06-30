'use client';

import React from 'react';

import classNames from 'classnames';

import styles from './CheckButton.module.css';

export type CheckImageProps = {
  label: string;
  onChange?: React.MouseEventHandler<HTMLButtonElement>;
  checked?: boolean;
  disabled?: boolean;
  mode?: 'base' | 'column';
};

export const CheckButton: React.FC<CheckImageProps> = ({
  label,
  checked,
  disabled,
  onChange,
  mode = 'base',
}) => {
  return (
    <button
      className={classNames(styles.item, {
        [styles.active]: checked,
        [styles.disabled]: disabled,
        [styles.column]: mode === 'column',
      })}
      onClick={onChange}
      disabled={disabled}>
      <div className={styles.label}>{label}</div>
    </button>
  );
};
