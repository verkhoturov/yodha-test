'use client';

import React from 'react';

import Image from 'next/image';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { OnboardingFormValues, TimeInputStepContent } from '@/entities/onboarding';
import { PrimaryButton, SkipButton, TimeInput } from '@/shared/ui';

interface TimeInputStepProps {
  content: TimeInputStepContent;
  goToNext: () => void;
}

export const TimeInputStep: React.FC<TimeInputStepProps> = ({ content, goToNext }) => {
  const { name, title, description, image, buttonTitle, skipButtonTitle } = content;
  const { setFieldValue } = useFormikContext<OnboardingFormValues>();

  const onSkipClick = () => {
    setFieldValue(name, '-');
    goToNext();
  };

  return (
    <div className={styles.wrap}>
      {image && <Image className={styles.image} src={image} alt="" />}

      {(title || description) && (
        <div className={styles.textWrap}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      <TimeInput className={styles.timeInput} name={name} />

      <PrimaryButton className={styles.button} onClick={goToNext}>
        {buttonTitle}
      </PrimaryButton>

      {skipButtonTitle && (
        <SkipButton className={styles.arrow} onClick={onSkipClick}>
          {skipButtonTitle}
        </SkipButton>
      )}
    </div>
  );
};
