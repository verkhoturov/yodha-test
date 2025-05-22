'use client';

import React from 'react';

import Image from 'next/image';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { TimeInputStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';
import { PrimaryButton, SkipButton, TimeInput } from '@/shared/ui';

interface TimeInputStepProps {
  content: TimeInputStepContent;
}

export const TimeInputStep: React.FC<TimeInputStepProps> = ({ content }) => {
  const { name, title, description, image, buttonTitle, skipButtonTitle } = content;

  const { nextStep } = useStepFormNavigation();
  const { setFieldValue } = useFormikContext<any>();

  const onSkipClick = () => {
    setFieldValue(name, null);
    nextStep();
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

      <PrimaryButton className={styles.button} onClick={nextStep}>
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
