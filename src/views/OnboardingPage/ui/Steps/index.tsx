'use client';

import React from 'react';

import { BetweenResultStep } from './BetweenResultStep';
import { CheckButtonsColumnStep } from './CheckButtonsColumnStep';
import { CheckButtonsGridStep } from './CheckButtonsGridStep';
import { CheckImagesStep } from './CheckImagesStep';
import { DateInputStep } from './DateInputStep';
import { InitialStep } from './InitialStep';
import { ProgressStep } from './ProgressStep';
import { TextInputStep } from './TextInputStep';
import { TimeInputStep } from './TimeInputStep';

import type { Step } from '@/entities/onboarding';
import {
  STEP_TYPES,
  betweenResultStepSchema,
  checkButtonsColumnStepSchema,
  checkButtonsGridStepSchema,
  checkImagesStepSchema,
  dateInputStepSchema,
  initialStepSchema,
  stepsProgressStepSchema,
  textInputStepSchema,
  timeInputStepSchema,
} from '@/entities/onboarding';

interface StepsProps {
  currentStep: Step;
  goToNext: () => void;
}

export const Steps: React.FC<StepsProps> = ({ currentStep, goToNext }) => {
  switch (currentStep.type) {
    case STEP_TYPES.Initial: {
      const checkedStep = initialStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <InitialStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.CheckImages: {
      const checkedStep = checkImagesStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <CheckImagesStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.DateInput: {
      const checkedStep = dateInputStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <DateInputStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.TimeInput: {
      const checkedStep = timeInputStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <TimeInputStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.BetweenResult: {
      const checkedStep = betweenResultStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <BetweenResultStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.CheckButtonsGrid: {
      const checkedStep = checkButtonsGridStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <CheckButtonsGridStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.CheckButtonsColumn: {
      const checkedStep = checkButtonsColumnStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <CheckButtonsColumnStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.TextInput: {
      const checkedStep = textInputStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <TextInputStep content={checkedStep.data} goToNext={goToNext} />;
    }
    case STEP_TYPES.StepsProgress: {
      const checkedStep = stepsProgressStepSchema.safeParse(currentStep);
      if (!checkedStep.success) break;
      return <ProgressStep content={checkedStep.data} goToNext={goToNext} />;
    }
    default: {
      console.error(`Unknown or invalid step type`);
      return null;
    }
  }

  console.error(`Step "${currentStep.name}" failed schema validation`);
  return null;
};
