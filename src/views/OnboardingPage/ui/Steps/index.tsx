'use client';

import React from 'react';

import { BetweenResultStep } from './BetweenResultStep';
// import { CardsStep } from './CardsStep';
import { CheckButtonsColumnStep } from './CheckButtonsColumnStep';
import { CheckButtonsGridStep } from './CheckButtonsGridStep';
import { CheckImagesStep } from './CheckImagesStep';
import { DateInputStep } from './DateInputStep';
import { InitialStep } from './InitialStep';
import { ProgressStep } from './ProgressStep';
import { TextInputStep } from './TextInputStep';
import { TimeInputStep } from './TimeInputStep';

import type {
  BetweenResultStepContent,
  // CardsStepContent,
  CheckButtonsColumnStepContent,
  CheckButtonsGridStepContent,
  CheckImagesStepContent,
  DateInputStepContent,
  InitialStepContent,
  Step,
  StepsProgressStepContent,
  TextInputStepContent,
  TimeInputStepContent,
} from '@/entities/onboarding';

type StepComponentMap = {
  initial: React.FC<{ content: InitialStepContent }>;
  check_images: React.FC<{ content: CheckImagesStepContent }>;
  date_input: React.FC<{ content: DateInputStepContent }>;
  time_input: React.FC<{ content: TimeInputStepContent }>;
  between_result: React.FC<{ content: BetweenResultStepContent }>;
  check_buttons_grid: React.FC<{ content: CheckButtonsGridStepContent }>;
  check_buttons_column: React.FC<{ content: CheckButtonsColumnStepContent }>;
  text_input: React.FC<{ content: TextInputStepContent }>;
  steps_progress: React.FC<{ content: StepsProgressStepContent }>;
  // cards: React.FC<{ content: CardsStepContent }>;
};

const stepComponentMap = {
  initial: InitialStep,
  check_images: CheckImagesStep,
  date_input: DateInputStep,
  time_input: TimeInputStep,
  between_result: BetweenResultStep,
  check_buttons_grid: CheckButtonsGridStep,
  check_buttons_column: CheckButtonsColumnStep,
  text_input: TextInputStep,
  steps_progress: ProgressStep,
  // cards: CardsStep, // TO DO: добавить cards в схему в @/entities/onboarding
} satisfies StepComponentMap;

type StepsProps = {
  content: Step;
};

export const Steps = ({ content }: StepsProps) => {
  const StepComponent = stepComponentMap[content.type as keyof StepComponentMap];

  if (!StepComponent) {
    console.warn(`Unknown step type: ${content.type}`);
    return null;
  }

  return <StepComponent content={content as never} />;
};
