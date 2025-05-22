'use client';

import React from 'react';

import { useFormikContext } from 'formik';

import styles from './index.module.css';

import { CardItem } from './CardItem';

import { useStepFormNavigation } from '@/shared/hooks';
import { PrimaryButton } from '@/shared/ui/PrimaryButton';
import { SkipButton } from '@/shared/ui/SkipButton';

// import type { CardsStepContent } from '@/entities/onboarding'; // TO DO добавить в '@/entities/onboarding

interface CardsStepProps {
  content: any; // CardsStepContent;
}

export const CardsStep: React.FC<CardsStepProps> = ({ content }) => {
  const { name, title, description, items = [], buttonTitle, skipButtonTitle } = content;

  const { nextStep } = useStepFormNavigation();
  const { setFieldValue, values, handleChange } = useFormikContext<any>();

  const value = values[name];

  const onSkipClick = () => {
    setFieldValue(name, null);
    nextStep();
  };

  return (
    <div className={styles.wrap}>
      {(title || description) && (
        <div className={styles.textWrap}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      )}

      <div className={styles.cardsWrap}>
        {// @ts-ignore // TO DO
        items?.map((card, index) => (
          <CardItem
            key={card.title + index}
            card={card}
            // @ts-ignore // TO DO
            onSelect={() => handleChange(name)(card.title)}
            selected={value === card.title}
          />
        ))}
      </div>

      <PrimaryButton className={styles.button} onClick={nextStep}>
        {buttonTitle}
      </PrimaryButton>

      {skipButtonTitle && (
        <SkipButton className={styles.arrow} onClick={onSkipClick}>
          {skipButtonTitle}
        </SkipButton>
      )}
    </div>
  );
};
