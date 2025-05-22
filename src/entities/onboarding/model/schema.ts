import { z } from 'zod';

// Общие элементы
const itemSchema = z.object({
  label: z.string(),
  imageName: z.string().optional(),
});

const progressItemSchema = z.object({
  label: z.string(),
});

const baseStepSchema = z.object({
  type: z.string(),
  title: z.string().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
});

// Шаги
export const initialStepSchema = baseStepSchema.extend({
  type: z.literal('initial'),
  buttonTitle: z.string(),
  buttonDescription: z.string(),
  image: z.string(),
});

export const checkImagesStepSchema = baseStepSchema.extend({
  type: z.literal('check_images'),
  valuesCount: z.number(),
  requiredCount: z.number(),
  titleBefore: z.string().optional(),
  items: z.array(itemSchema),
  name: z.string(),
});

export const checkButtonsColumnStepSchema = baseStepSchema.extend({
  type: z.literal('check_buttons_column'),
  items: z.array(itemSchema),
  name: z.string(),
});

export const checkButtonsGridStepSchema = baseStepSchema.extend({
  type: z.literal('check_buttons_grid'),
  items: z.array(itemSchema),
  valuesCount: z.number(),
  requiredCount: z.number(),
  name: z.string(),
});

export const betweenResultStepSchema = baseStepSchema.extend({
  type: z.literal('between_result'),
  image: z.string().optional(),
});

export const dateInputStepSchema = baseStepSchema.extend({
  type: z.literal('date_input'),
  name: z.string(),
  image: z.string(),
  buttonTitle: z.string(),
  skipButtonTitle: z.string().optional(),
});

export const timeInputStepSchema = baseStepSchema.extend({
  type: z.literal('time_input'),
  name: z.string(),
  buttonTitle: z.string(),
  skipButtonTitle: z.string(),
  image: z.string().optional(),
});

export const textInputStepSchema = baseStepSchema.extend({
  type: z.literal('text_input'),
  name: z.string(),
  inputPlaceholder: z.string().optional(),
  inputDescription: z.string().optional(),
  inputLabel: z.string().optional(),
  buttonTitle: z.string().optional(),
  inputType: z.string().optional(),
  action: z.string().optional(),
  image: z.string().optional(),
  skipButtonTitle: z.string().optional(),
});

export const stepsProgressStepSchema = z.object({
  type: z.literal('steps_progress'),
  items: z.array(progressItemSchema),
});

// Массив допустимых схем шагов
export const availableStepSchemas = [
  initialStepSchema,
  checkImagesStepSchema,
  checkButtonsColumnStepSchema,
  checkButtonsGridStepSchema,
  betweenResultStepSchema,
  dateInputStepSchema,
  timeInputStepSchema,
  textInputStepSchema,
  stepsProgressStepSchema,
] as const;

// Универсальный union для discriminated union
export const stepSchema = z.discriminatedUnion('type', availableStepSchemas);

export const onboardingConfigSchema = z.object({
  steps: z.array(stepSchema),
});
