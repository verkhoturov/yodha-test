'use client';

import React from 'react';

import Image from 'next/image';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { OnboardingFormValues, TextInputStepContent } from '@/entities/onboarding';
import { PrimaryButton, SkipButton, TextInput } from '@/shared/ui';

interface TextInputStepProps {
  content: TextInputStepContent;
  goToNext: () => void;
}

export const TextInputStep: React.FC<TextInputStepProps> = ({ content, goToNext }) => {
  const {
    name,
    title,
    description,
    image,
    inputLabel,
    inputType,
    inputDescription,
    inputPlaceholder,
    buttonTitle,
    skipButtonTitle,
    action,
  } = content;

  const { setFieldValue, values } = useFormikContext<OnboardingFormValues>();

  const value = values[name];

  const onSkipClick = () => {
    setFieldValue(name, '-');
    goToNext();
  };

  const isDisabled = skipButtonTitle ? false : !Boolean(value);

  return (
    <div className={styles.wrap}>
      {image && <Image className={styles.image} src={image} alt="" />}

      {(title || description) && (
        <div className={styles.textWrap}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      <TextInput
        className={styles.dateInput}
        name={name}
        type={inputType}
        label={inputLabel}
        description={inputDescription}
        placeholder={inputPlaceholder}
      />

      <PrimaryButton className={styles.button} onClick={goToNext} disabled={isDisabled}>
        {buttonTitle}
      </PrimaryButton>

      {action !== 'submit' && skipButtonTitle && (
        <SkipButton className={styles.arrow} onClick={onSkipClick}>
          {skipButtonTitle}
        </SkipButton>
      )}
    </div>
  );
};
