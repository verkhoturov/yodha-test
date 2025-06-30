'use client';

import React from 'react';

import Image from 'next/image';

import styles from './index.module.css';

import type { BetweenResultStepContent } from '@/entities/onboarding';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';

interface BetweenResultStepProps {
  content: BetweenResultStepContent;
  goToNext: () => void;
}

export const BetweenResultStep: React.FC<BetweenResultStepProps> = ({ content, goToNext }) => {
  const { image, title, description } = content;

  return (
    <>
      {image && (
        <div className={styles.image}>
          <Image src={image} alt={title || 'image'} width={100} height={100} />
        </div>
      )}

      {title && (
        <div className={styles.caption}>
          <h2 className={styles.title}>{title}</h2>
        </div>
      )}

      {description && (
        <div className={styles.content}>
          <p className={styles.description}>{description}</p>
        </div>
      )}

      <div className={styles.footer}>
        <PrimaryButton onClick={goToNext}>Continue</PrimaryButton>
      </div>
    </>
  );
};
