import type {
  // OnboardingFormValues,
  Step,
} from '@/entities/onboarding';

const getAgeFromDate = (value: { day: string; month: string; year: string }): number => {
  const birthDate = new Date(Number(value.year), Number(value.month) - 1, Number(value.day));
  const now = new Date();

  const age = now.getFullYear() - birthDate.getFullYear();
  const m = now.getMonth() - birthDate.getMonth();
  return m < 0 || (m === 0 && now.getDate() < birthDate.getDate()) ? age - 1 : age;
};

export const resolveNextStep = (
  step: Step, // values: OnboardingFormValues
): string | null => {
  const next = step.next;

  if (!next) return null;
  if (typeof next === 'string') return next;

  /*
  for (const condition of next.conditions) {
    const matches = condition.if.every(({ field, operator, value, type }) => {
      const answer = values[field];
      const actual =
        type === 'age' 
          ? getAgeFromDate(answer)
          : answer;

      if (typeof actual === 'string') {
        if (operator === '===') return actual === value;
        if (operator === '!==') return actual !== value;
        return false;
      }

      if (typeof actual === 'number' && typeof value === 'number') {
        if (
          operator === '===' ||
          operator === '!==' ||
          operator === '<' ||
          operator === '<=' ||
          operator === '>' ||
          operator === '>='
        ) {
          switch (operator) {
            case '===':
              return actual === value;
            case '!==':
              return actual !== value;
            case '<':
              return actual < value;
            case '<=':
              return actual <= value;
            case '>':
              return actual > value;
            case '>=':
              return actual >= value;
            default:
              return false;
          }
        }
        return false;
      }

      if (Array.isArray(actual) && typeof value === 'string') {
        if (operator === 'includes') {
          return actual.includes(value);
        }
        return false;
      }

      return false;
    });

    if (matches) return condition.goTo;
  }
  */

  return next.fallback ?? null;
};
