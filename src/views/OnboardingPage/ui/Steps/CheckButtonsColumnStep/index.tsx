'use client';

import React from 'react';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { CheckButtonsColumnStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';
import { CheckButton } from '@/shared/ui/CheckButton';

interface CheckButtonsColumnStepProps {
  content: CheckButtonsColumnStepContent;
}

export const CheckButtonsColumnStep: React.FC<CheckButtonsColumnStepProps> = ({ content }) => {
  const { name, title, description, items } = content;

  const { nextStep } = useStepFormNavigation();
  const { values, handleChange } = useFormikContext<any>();

  const value = values[name];

  return (
    <>
      {title && (
        <section className={styles.caption}>
          <h3 className={styles.title}>{title}</h3>
        </section>
      )}

      {description && (
        <section className={styles.description}>
          <p>{description}</p>
        </section>
      )}

      <section className={styles.items}>
        {items.map((item, index) => {
          const onChange = () => {
            handleChange(name)(item.label);
            nextStep();
          };

          return (
            <CheckButton
              key={index}
              label={item.label}
              checked={value === item.label}
              onChange={onChange}
              mode="column"
            />
          );
        })}
      </section>
    </>
  );
};
