import { OnboardingConfig, onboardingConfigSchema } from '../model';

export async function getOnboardingConfig(slug: string): Promise<OnboardingConfig> {
  const res = await fetch(`/api/onboarding/${slug}`);

  if (!res.ok) {
    throw new Error(`Failed to load onboarding config for slug: ${slug}`);
  }

  const json = await res.json();
  const result = onboardingConfigSchema.safeParse(json);

  if (!result.success) {
    console.error(result.error.format());
    throw new Error('Invalid onboarding config format');
  }

  return result.data;
}
