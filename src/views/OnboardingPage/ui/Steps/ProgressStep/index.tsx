'use client';

import React from 'react';

import classNames from 'classnames';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

import styles from './index.module.css';

import progressCircleAnimation from './progress-circle-animation.json';

import type { StepsProgressStepContent } from '@/entities/onboarding';
import { useStepFormNavigation } from '@/shared/hooks';

const ANIMATION_DURATION = 10000;

const ProgressPercentCounter: React.FC = () => {
  const [percent, setPercent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPercent(prev => {
        if (prev === 99) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, ANIMATION_DURATION / 100);

    return () => clearInterval(interval);
  }, []);

  return <div className={styles.progressPercent}>{percent}%</div>;
};

interface ProgressStepProps {
  content: StepsProgressStepContent;
}

export const ProgressStep: React.FC<ProgressStepProps> = ({ content }) => {
  const { items } = content;
  const { nextStep } = useStepFormNavigation();

  const progressRef = React.useRef<LottieRefCurrentProps>(null);
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);

  React.useEffect(() => {
    if (progressRef.current) {
      progressRef.current.setSpeed(0.045);
      progressRef.current.goToAndPlay(2, true);
    }
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex(prev => {
        if (prev === items.length - 1) {
          clearInterval(interval);
          setTimeout(() => nextStep(), 1000);
          return items.length;
        }
        return prev + 1;
      });
    }, ANIMATION_DURATION / items.length);

    return () => clearInterval(interval);
  }, [items.length, nextStep]);

  return (
    <section className={styles.wrapper}>
      <section className={styles.progress}>
        <Lottie lottieRef={progressRef} animationData={progressCircleAnimation} loop={false} />
        <ProgressPercentCounter />
      </section>

      <section className={styles.items}>
        {items.map((item, index) => (
          <div
            key={index}
            className={classNames(styles.item, {
              [styles.itemFinished]: index < activeItemIndex,
              [styles.itemActive]: index === activeItemIndex,
            })}>
            <span>{item.label}</span>
          </div>
        ))}
      </section>
    </section>
  );
};
