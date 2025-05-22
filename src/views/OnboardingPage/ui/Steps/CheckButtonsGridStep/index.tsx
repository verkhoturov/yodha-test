'use client';

import React from 'react';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { CheckButtonsGridStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';
import { CheckButton } from '@/shared/ui/CheckButton';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

interface CheckButtonsGridStepProps {
  content: CheckButtonsGridStepContent;
}

export const CheckButtonsGridStep: React.FC<CheckButtonsGridStepProps> = ({ content }) => {
  const { name, valuesCount, requiredCount, title, description, items } = content;

  const { nextStep } = useStepFormNavigation();
  const { values, handleChange } = useFormikContext<any>();

  const value = values[name];
  const isMultiple = valuesCount > 1;

  const selectedValuesCount = isMultiple ? value.filter((v: any) => v && v !== '').length : 1;

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
          const checked = isMultiple ? value?.includes(item.label) : item.label === value;

          const onChange = () => {
            const newValue = isMultiple && checked ? '' : item.label;

            if (isMultiple) {
              handleChange(`${name}.${index}`)(newValue);
            } else {
              handleChange(name)(newValue);
              nextStep();
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
          <PrimaryButton onClick={nextStep} disabled={!isSelectedRequired}>
            Continue
          </PrimaryButton>
        </section>
      )}
    </>
  );
};
