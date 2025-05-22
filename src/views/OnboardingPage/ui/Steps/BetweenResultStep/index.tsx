'use client';

import React from 'react';

import Image from 'next/image';

import styles from './index.module.css';

import type { BetweenResultStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

interface BetweenResultStepProps {
  content: BetweenResultStepContent;
}

export const BetweenResultStep: React.FC<BetweenResultStepProps> = ({ content }) => {
  const { image, title, description } = content;
  const { nextStep } = useStepFormNavigation();

  return (
    <>
      {image && (
        <section className={styles.image}>
          <Image src={image} alt={title || 'image'} width={100} height={100} />
        </section>
      )}

      {title && (
        <section className={styles.caption}>
          <h2 className={styles.title}>{title}</h2>
        </section>
      )}

      {description && (
        <section className={styles.content}>
          <p className={styles.description}>{description}</p>
        </section>
      )}

      <section className={styles.footer}>
        <PrimaryButton onClick={nextStep}>Continue</PrimaryButton>
      </section>
    </>
  );
};
