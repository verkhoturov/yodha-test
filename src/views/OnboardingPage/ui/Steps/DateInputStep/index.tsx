'use client';

import React from 'react';

import Image from 'next/image';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { DateInputStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';
import { DateInput, PrimaryButton, SkipButton } from '@/shared/ui';

interface DateInputStepProps {
  content: DateInputStepContent;
}

export const DateInputStep: React.FC<DateInputStepProps> = ({ content }) => {
  const { name, title, description, image, buttonTitle, skipButtonTitle } = content;

  const { nextStep } = useStepFormNavigation();
  const { setFieldValue } = useFormikContext<any>();

  const onSkipClick = () => {
    setFieldValue(name, null);
    nextStep();
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
