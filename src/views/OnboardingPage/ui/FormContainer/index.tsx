'use client';

import React, { PropsWithChildren, useMemo } from 'react';

import { Form, Formik } from 'formik';

import styles from './index.module.css';

import { StepIndicator } from '../StepIndicator';

import type { OnboardingConfig, OnboardingFormValues } from '@/entities/onboarding';
import { STEP_TYPES } from '@/entities/onboarding';

const multiSelectTypes = new Set(['check_images', 'check_buttons_grid']);

interface FormContainerProps extends PropsWithChildren {
  config: OnboardingConfig;
  slug: string;
  stepIndicatorHidden?: boolean;
}

export const FormContainer: React.FC<FormContainerProps> = ({
  children,
  config,
  slug,
  stepIndicatorHidden,
}) => {
  const SAVE_VALUES_KEY = `onboarding-form-${slug}-values`;

  const getInitialFormValues = (config: OnboardingConfig) => {
    const values: Record<string, unknown> = {};

    config.steps.forEach(step => {
      if (
        step.name &&
        step.type !== STEP_TYPES.BetweenResult &&
        step.type !== STEP_TYPES.StepsProgress &&
        step.type !== STEP_TYPES.Initial &&
        step.type !== STEP_TYPES.Final
      ) {
        const isMulti = multiSelectTypes.has(step.type);
        values[step.name] = isMulti ? [] : '';
      }
    });

    return values;
  };

  const initialFormValues = useMemo(() => getInitialFormValues(config), [config]);

  let savedValues = {};

  if (typeof window !== 'undefined') {
    try {
      savedValues = JSON.parse(localStorage.getItem(SAVE_VALUES_KEY) || '{}');
    } catch {
      savedValues = {};
    }
  }

  return (
    <Formik<OnboardingFormValues>
      initialValues={{ ...initialFormValues, ...savedValues }}
      onSubmit={() => {}}>
      {({ values }) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(SAVE_VALUES_KEY, JSON.stringify(values));
        }

        return (
          <Form>
            <div className={styles.wrapper}>
              {!stepIndicatorHidden && <StepIndicator totalSteps={config.steps.length} />}

              <div className={styles.content}>{children}</div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
