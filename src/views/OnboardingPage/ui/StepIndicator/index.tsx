'use client';

import React from 'react';

import cn from 'classnames';
import { useFormikContext } from 'formik';

import styles from './StepIndicator.module.css';

import type { OnboardingFormValues } from '@/entities/onboarding';

interface StepIndicatorProps {
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = () => {
  const { values } = useFormikContext<OnboardingFormValues>();
  const entries = Object.entries(values);
  const totalCount = entries.length;

  const filledFieldsCount = entries.filter(([, value]) => {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  }).length;

  const normalized = filledFieldsCount / totalCount;
  const indicatorPercent = Math.round(Math.pow(normalized, 0.5) * 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.caption}>
        {/* currentStep > 0 ? (
          <a className={styles.back} onClick={() => previousStep()}>
            Back
          </a>
        ) : null */}
      </div>
      <div className={styles.indicator}>
        <div
          className={cn(styles.indicatorLine, {
            [styles.indicatorLineSuccess]: indicatorPercent === 100,
          })}
          style={{ width: `${indicatorPercent}%` }}
        />
      </div>
    </div>
  );
};
