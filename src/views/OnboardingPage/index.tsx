'use client';

import React from 'react';

import styles from './index.module.css';

import { FormContainer } from './ui/FormContainer';
import { Steps } from './ui/Steps';

import { OnboardingConfig, getOnboardingConfig } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';

// import { Header } from '@/shared/ui/Header';

interface OnboardingPageProps {
  slug: string;
}

export const OnboardingPage = ({ slug }: OnboardingPageProps) => {
  const { currentStep } = useStepFormNavigation();

  const [config, setConfig] = React.useState<OnboardingConfig | null>(null);

  React.useEffect(() => {
    getOnboardingConfig(slug)
      .then(setConfig)
      .catch(err => {
        console.error(err);
      });
  }, [slug]);

  if (!config) return null;

  const stepContent = config.steps[currentStep];
  const stepIndicatorHidden =
    stepContent?.type === 'initial' ||
    stepContent?.type === 'between_result' ||
    stepContent?.type === 'steps_progress';

  return (
    <main className={styles.main}>
      {/* <Header /> */}

      <section className={styles.content}>
        {stepContent ? (
          <FormContainer config={config} slug={slug} stepIndicatorHidden={stepIndicatorHidden}>
            <Steps content={stepContent} />
          </FormContainer>
        ) : (
          <p>No data for step number {currentStep}</p>
        )}
      </section>
    </main>
  );
};
