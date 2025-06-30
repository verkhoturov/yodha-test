'use client';

import React from 'react';

import styles from './index.module.css';

import { FormContainer } from './ui/FormContainer';
import { Steps } from './ui/Steps';
import { useStepFormNavigation } from './useStepFormNavigation';

import { OnboardingConfig, getOnboardingConfig } from '@/entities/onboarding';

// import { Header } from '@/shared/ui/Header';

interface OnboardingPageProps {
  slug: string;
}

export const OnboardingPage = ({ slug }: OnboardingPageProps) => {
  const [config, setConfig] = React.useState<OnboardingConfig | null>(null);

  const { currentStep, goToNext } = useStepFormNavigation(slug, config);

  React.useEffect(() => {
    getOnboardingConfig(slug).then(setConfig).catch(console.error);
  }, [slug]);

  if (!config || !currentStep) {
    return <p>Loading...</p>;
  }

  const stepIndicatorHidden =
    currentStep.type === 'initial' ||
    currentStep.type === 'between_result' ||
    currentStep.type === 'steps_progress';

  return (
    <main className={styles.main}>
      {/* <Header /> */}

      <section className={styles.content}>
        <FormContainer config={config} slug={slug} stepIndicatorHidden={stepIndicatorHidden}>
          <Steps currentStep={currentStep} goToNext={goToNext} />
        </FormContainer>
      </section>
    </main>
  );
};
