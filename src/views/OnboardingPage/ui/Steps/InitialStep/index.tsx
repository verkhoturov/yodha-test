'use client';

import React from 'react';

import Image from 'next/image';

import styles from './index.module.css';

import type { InitialStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';
import { PrimaryButton } from '@/shared/ui/';

type InitialStepProps = {
  content: InitialStepContent;
};

export const InitialStep: React.FC<InitialStepProps> = ({ content }) => {
  const { nextStep } = useStepFormNavigation();

  const { title, description, buttonTitle, buttonDescription, image } = content;

  return (
    <div className={styles.wrap}>
      <div className={styles.contentWrap}>
        <h2 className={styles.title}>{title}</h2>
        {description ? <p className={styles.description}>{description}</p> : null}
        {image && (
          <Image className={styles.mobileImage} src={image} width={330} height={200} alt="" />
        )}

        <PrimaryButton className={styles.button} onClick={() => nextStep()}>
          {buttonTitle}
        </PrimaryButton>

        {buttonDescription ? (
          <p
            className={styles.buttonDescription}
            dangerouslySetInnerHTML={{
              __html: buttonDescription,
            }}
          />
        ) : null}
      </div>

      {image && (
        <Image className={styles.desktopImage} width={320} height={240} src={image} alt="" />
      )}
    </div>
  );
};
