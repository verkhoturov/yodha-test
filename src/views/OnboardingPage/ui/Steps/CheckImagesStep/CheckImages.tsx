'use client';

import React from 'react';

import { useFormikContext } from 'formik';

import styles from './CheckImages.module.css';

import { ImageCard } from './ImageCard';
import type { CheckImageNames } from './types';

import type { CheckImagesStepContent, OnboardingFormValues } from '@/entities/onboarding';
import { PrimaryButton } from '@/shared/ui';

interface CheckImagesStepProps {
  content: CheckImagesStepContent;
  goToNext: () => void;
}

export const CheckImagesStep: React.FC<CheckImagesStepProps> = ({ content, goToNext }) => {
  const { name, valuesCount, requiredCount, titleBefore, title, items } = content;
  const { values, handleChange } = useFormikContext<OnboardingFormValues>();

  const value = values[name];
  const isMultiple = valuesCount > 1;

  const selectedValuesCount = isMultiple && Array.isArray(value) ? value.filter(Boolean).length : 1;

  const isSelectedRequired = isMultiple ? selectedValuesCount >= requiredCount : false;
  const isSelectedAll = isMultiple ? selectedValuesCount >= valuesCount : false;

  return (
    <>
      <div className={styles.caption}>
        {titleBefore && <h4 className={styles.titleBefore}>{titleBefore}</h4>}
        {title && <h3 className={styles.title}>{title}</h3>}
      </div>

      <div className={styles.items}>
        {items.map((item, index) => {
          if (!item.imageName) return null;

          const checked =
            isMultiple && Array.isArray(value)
              ? value?.some(v => v === item.label)
              : item.label === value;

          const onClick = () => {
            const newValue = isMultiple && checked ? '' : item.label;

            if (isMultiple) {
              handleChange(`${name}.${index}`)(newValue);
            } else {
              handleChange(name)(newValue);
              goToNext();
            }
          };

          return (
            <ImageCard
              key={index}
              imageName={item.imageName as CheckImageNames} // TO DO: CheckImageNames перенести в @/entities/onboarding/types
              label={item.label}
              checked={checked}
              disabled={!checked && isSelectedAll}
              onClick={onClick}
            />
          );
        })}
      </div>

      {isMultiple && (
        <div className={styles.footer}>
          <PrimaryButton onClick={goToNext} disabled={!isSelectedRequired}>
            Continue
          </PrimaryButton>
        </div>
      )}
    </>
  );
};
