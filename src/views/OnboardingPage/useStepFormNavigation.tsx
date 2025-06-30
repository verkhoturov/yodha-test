'use client';

import { useEffect, useState } from 'react';

// import { useFormikContext } from 'formik';

import { resolveNextStep } from './utils';

import type {
  OnboardingConfig,
  // OnboardingFormValues,
  Step,
} from '@/entities/onboarding';

export const useStepFormNavigation = (slug: string, config: OnboardingConfig | null) => {
  const LAST_STEP_KEY = `onboarding-form-${slug}-last-step`;
  const [stepName, setStepName] = useState<string | null>(null);

  // const formData = useFormikContext<OnboardingFormValues>();

  useEffect(() => {
    const lastStep = localStorage.getItem(LAST_STEP_KEY);
    if (lastStep) setStepName(lastStep);
  }, []);

  useEffect(() => {
    if (stepName) {
      localStorage.setItem(LAST_STEP_KEY, stepName);
    }
  }, [stepName]);

  const firstStep = config?.steps.find(step => step.type === 'initial') ?? config?.steps[0];
  const currentStep: Step | undefined =
    config?.steps.find(step => step.name === stepName) ?? firstStep;

  const goToStep = (name: string) => {
    setStepName(name);
  };

  const goToNext = () => {
    if (!currentStep) return;

    const nextStepName = resolveNextStep(
      currentStep, // formData?.values
    );

    if (nextStepName) {
      setStepName(nextStepName);
    } else {
      console.warn(`Step "${currentStep?.name}" does not define "next"`);
    }
  };

  useEffect(() => {
    if (!stepName && firstStep) {
      setStepName(firstStep.name);
    }
  }, [stepName, firstStep]);

  return {
    currentStep,
    stepName,
    goToStep,
    goToNext,
  };
};
