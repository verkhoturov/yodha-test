'use client';

import React from 'react';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { CheckButtonsGridStepContent, OnboardingFormValues } from '@/entities/onboarding';
import { CheckButton, PrimaryButton } from '@/shared/ui';

interface CheckButtonsGridStepProps {
  content: CheckButtonsGridStepContent;
  goToNext: () => void;
}

export const CheckButtonsGridStep: React.FC<CheckButtonsGridStepProps> = ({
  content,
  goToNext,
}) => {
  const { name, valuesCount, requiredCount, title, description, items } = content;

  const { values, handleChange } = useFormikContext<OnboardingFormValues>();

  const value = values[name];
  const isMultiple = valuesCount > 1;

  const selectedValuesCount =
    isMultiple && Array.isArray(value) ? value.filter(v => v && v !== '').length : 1;

  const isSelectedRequired = isMultiple ? selectedValuesCount >= requiredCount : false;
  const isSelectedAll = isMultiple ? selectedValuesCount >= valuesCount : false;

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
          const checked =
            isMultiple && Array.isArray(value) ? value?.includes(item.label) : item.label === value;

          const onChange = () => {
            const newValue = isMultiple && checked ? '' : item.label;

            if (isMultiple) {
              handleChange(`${name}.${index}`)(newValue);
            } else {
              handleChange(name)(newValue);
              goToNext();
            }
          };

          return (
            <CheckButton
              key={index}
              label={item.label}
              checked={checked}
              disabled={!checked && isSelectedAll}
              onChange={onChange}
            />
          );
        })}
      </section>

      {isMultiple && (
        <section className={styles.footer}>
          <PrimaryButton onClick={goToNext} disabled={!isSelectedRequired}>
            Continue
          </PrimaryButton>
        </section>
      )}
    </>
  );
};
