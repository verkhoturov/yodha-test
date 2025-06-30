import { z } from 'zod';

import { STEP_TYPES } from './constants';

// Валидация объекта даты (для age)
export const ageValueSchema = z.object({
  day: z.string(),
  month: z.string(),
  year: z.string(),
});

export const valuesSchema = z.union([z.string(), z.number(), z.array(z.string()), ageValueSchema]);

export const stringConditionSchema = z.object({
  field: z.string(),
  type: z.literal('string'),
  operator: z.enum(['===', '!==']),
  value: z.string(),
});

export const numberConditionSchema = z.object({
  field: z.string(),
  type: z.literal('number'),
  operator: z.enum(['===', '!==', '<', '<=', '>', '>=']),
  value: z.number(),
});

export const ageConditionSchema = z.object({
  field: z.string(),
  type: z.literal('age'),
  operator: z.enum(['===', '!==', '<', '<=', '>', '>=']),
  value: ageValueSchema,
});

export const arrayConditionSchema = z.object({
  field: z.string(),
  type: z.literal('array'),
  operator: z.literal('includes'),
  value: z.string(),
});

export const conditionSchema = z.union([
  stringConditionSchema,
  numberConditionSchema,
  ageConditionSchema,
  arrayConditionSchema,
]);

export const conditionalNextSchema = z.object({
  conditions: z.array(
    z.object({
      if: z.array(conditionSchema),
      goTo: z.string(),
    }),
  ),
  fallback: z.string(),
});

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
  name: z.string(),
  next: z.union([z.string(), conditionalNextSchema]).optional(),
});

// Шаги
export const initialStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.Initial),
  buttonTitle: z.string(),
  buttonDescription: z.string(),
  image: z.string(),
});

export const checkImagesStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.CheckImages),
  valuesCount: z.number(),
  requiredCount: z.number(),
  titleBefore: z.string().optional(),
  items: z.array(itemSchema),
});

export const checkButtonsColumnStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.CheckButtonsColumn),
  items: z.array(itemSchema),
});

export const checkButtonsGridStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.CheckButtonsGrid),
  items: z.array(itemSchema),
  valuesCount: z.number(),
  requiredCount: z.number(),
});

export const betweenResultStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.BetweenResult),
  image: z.string().optional(),
});

export const dateInputStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.DateInput),
  image: z.string(),
  buttonTitle: z.string(),
  skipButtonTitle: z.string().optional(),
});

export const timeInputStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.TimeInput),
  buttonTitle: z.string(),
  skipButtonTitle: z.string(),
  image: z.string().optional(),
});

export const textInputStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.TextInput),
  inputPlaceholder: z.string().optional(),
  inputDescription: z.string().optional(),
  inputLabel: z.string().optional(),
  buttonTitle: z.string().optional(),
  inputType: z.string().optional(),
  action: z.string().optional(),
  image: z.string().optional(),
  skipButtonTitle: z.string().optional(),
});

export const stepsProgressStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.StepsProgress),
  items: z.array(progressItemSchema),
});

export const finalStepSchema = baseStepSchema.extend({
  type: z.literal(STEP_TYPES.Final),
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
  finalStepSchema,
] as const;

// Универсальный union для discriminated union
export const stepSchema = z.discriminatedUnion('type', availableStepSchemas);

export const onboardingConfigSchema = z.object({
  steps: z.array(stepSchema),
});
