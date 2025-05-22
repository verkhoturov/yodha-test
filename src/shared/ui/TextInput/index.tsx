'use client';

import React, { useId } from 'react';

import cn from 'classnames';
import { Field, FieldAttributes } from 'formik';

import styles from './TextInput.module.css';

export type TextInputProps = {
  wrapClassName?: string;
  label?: string;
  description?: string;
  suffixIcon?: React.ReactNode;
} & FieldAttributes<unknown>;

export const TextInput: React.FC<TextInputProps> = ({
  className,
  wrapClassName,
  label,
  description,
  suffixIcon,
  children,
  ...props
}) => {
  const id = useId();

  return (
    <div className={cn(styles.wrap, wrapClassName)}>
      {label ? (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      ) : null}

      <div className={styles.inputWrap}>
        <Field
          className={cn(styles.input, className, {
            [styles.withSuffixIcon]: Boolean(suffixIcon),
          })}
          id={id}
          {...props}>
          {children}
        </Field>
        {suffixIcon ? <span className={styles.icon}>{suffixIcon}</span> : null}
      </div>

      {description ? <p className={styles.description}>{description}</p> : null}
    </div>
  );
};
