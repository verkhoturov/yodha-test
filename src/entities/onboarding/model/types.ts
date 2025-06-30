import { z } from 'zod';

import {
  betweenResultStepSchema,
  checkButtonsColumnStepSchema,
  checkButtonsGridStepSchema,
  checkImagesStepSchema,
  dateInputStepSchema,
  finalStepSchema,
  initialStepSchema,
  onboardingConfigSchema,
  stepSchema,
  stepsProgressStepSchema,
  textInputStepSchema,
  timeInputStepSchema,
  valuesSchema,
} from './schema';

export type OnboardingConfig = z.infer<typeof onboardingConfigSchema>;
export type Step = z.infer<typeof stepSchema>;

export type InitialStepContent = z.infer<typeof initialStepSchema>;
export type CheckImagesStepContent = z.infer<typeof checkImagesStepSchema>;
export type CheckButtonsColumnStepContent = z.infer<typeof checkButtonsColumnStepSchema>;
export type CheckButtonsGridStepContent = z.infer<typeof checkButtonsGridStepSchema>;
export type BetweenResultStepContent = z.infer<typeof betweenResultStepSchema>;
export type DateInputStepContent = z.infer<typeof dateInputStepSchema>;
export type TimeInputStepContent = z.infer<typeof timeInputStepSchema>;
export type TextInputStepContent = z.infer<typeof textInputStepSchema>;
export type StepsProgressStepContent = z.infer<typeof stepsProgressStepSchema>;
export type FinalStepContent = z.infer<typeof finalStepSchema>;

export type OnboardingFormValues = Record<string, z.infer<typeof valuesSchema> | null>;
