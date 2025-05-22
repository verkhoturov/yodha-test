'use client';

import React from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type StepFormNavigation = {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
};

export const useStepFormNavigation = (): StepFormNavigation => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();
  const currentStep = Number(searchParams?.get('step')) || 0;

  const nextStep = React.useCallback(() => {
    router.push(`${pathname}?step=${currentStep + 1}`);
  }, [currentStep, pathname, router]);

  const previousStep = React.useCallback(() => {
    if (currentStep - 1 < 0) {
      return;
    }

    router.back();
  }, [currentStep, router]);

  return { currentStep, nextStep, previousStep };
};
