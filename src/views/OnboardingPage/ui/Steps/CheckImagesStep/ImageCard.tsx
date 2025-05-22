'use client';

import React from 'react';

import Image, { StaticImageData } from 'next/image';

import classNames from 'classnames';

import styles from './ImageCard.module.css';

import genderFemaleImg from './imgs/gender-female.svg';
import genderLGBTImg from './imgs/gender-lgbti.svg';
import genderMaleImg from './imgs/gender-male.svg';
import genderNoneImg from './imgs/gender-none.svg';
import { CheckImageNames } from './types';

const checkImages: Record<CheckImageNames, StaticImageData> = {
  [CheckImageNames.GENDER_FEMALE]: genderFemaleImg,
  [CheckImageNames.GENDER_MALE]: genderMaleImg,
  [CheckImageNames.GENDER_NONE]: genderNoneImg,
  [CheckImageNames.GENDER_LGBT]: genderLGBTImg,
};

type ImageCardProps = {
  imageName: CheckImageNames;
  label: string;
  checked: boolean;
  disabled: boolean;
  onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const ImageCard: React.FC<ImageCardProps> = ({
  imageName,
  label,
  checked,
  disabled,
  onClick,
}) => {
  const image = checkImages[imageName];

  return (
    <button
      className={classNames(styles.item, {
        [styles.active]: checked,
        [styles.disabled]: disabled,
      })}
      onClick={onClick}
      disabled={disabled}>
      <Image
        className={styles.image}
        src={image}
        alt={label}
        width={image.width}
        height={image.height}
      />
      <span className={styles.label}>{label}</span>
    </button>
  );
};
