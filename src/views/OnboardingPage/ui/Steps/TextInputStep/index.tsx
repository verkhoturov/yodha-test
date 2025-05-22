'use client';

import React from 'react';

import Image from 'next/image';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import type { TextInputStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { SkipButton } from '@/shared/ui/SkipButton';
import { TextInput } from '@/shared/ui/TextInput';

interface TextInputStepProps {
  content: TextInputStepContent;
}

export const TextInputStep: React.FC<TextInputStepProps> = ({ content }) => {
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

  const { nextStep } = useStepFormNavigation();
  const { setFieldValue } = useFormikContext<any>();

  const onSkipClick = () => {
    setFieldValue(name, null);
    nextStep();
  };

  const onClick = async () => {
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

      <TextInput
        className={styles.dateInput}
        name={name}
        type={inputType}
        label={inputLabel}
        description={inputDescription}
        placeholder={inputPlaceholder}
      />

      <PrimaryButton className={styles.button} onClick={onClick}>
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
