'use client';

import React from 'react';

import classNames from 'classnames';

import styles from './StepIndicator.module.css';

import { useStepFormNavigation } from '@/shared/hooks/useStepFormNavigation';

interface StepIndicatorProps {
  totalSteps: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ totalSteps }) => {
  const { currentStep, previousStep } = useStepFormNavigation();

  const indicatorPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={styles.wrapper}>
      <div className={styles.caption}>
        {currentStep > 0 ? (
          <a className={styles.back} onClick={() => previousStep()}>
            Back
          </a>
        ) : null}
        <div className={styles.pages}>
          <span className={styles.pagesCurrent}>{currentStep}</span>
          <span className={styles.pagesSeparator}>/</span>
          <span className={styles.pagesTotal}>{totalSteps}</span>
        </div>
      </div>
      <div className={styles.indicator}>
        <div
          className={classNames(styles.indicatorLine, {
            [styles.indicatorLineSuccess]: indicatorPercent === 100,
          })}
          style={{ width: `${indicatorPercent}%` }}
        />
      </div>
    </div>
  );
};
