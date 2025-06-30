'use client';

import React from 'react';

import Image from 'next/image';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { DateInputStepContent, OnboardingFormValues } from '@/entities/onboarding';
import { DateInput, PrimaryButton, SkipButton } from '@/shared/ui';

interface DateInputStepProps {
  content: DateInputStepContent;
  goToNext: () => void;
}

export const DateInputStep: React.FC<DateInputStepProps> = ({ content, goToNext }) => {
  const { name, title, description, image, buttonTitle, skipButtonTitle } = content;
  const { setFieldValue } = useFormikContext<OnboardingFormValues>();

  const onSkipClick = () => {
    setFieldValue(name, '-');
    goToNext();
  };

  return (
    <div className={styles.wrap}>
      {image && <Image className={styles.image} src={image} alt="" width={400} height={200} />}

      {(title || description) && (
        <div className={styles.textWrap}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      <DateInput className={styles.dateInput} name={name} />

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
