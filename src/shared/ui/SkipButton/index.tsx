import React from 'react';

import cn from 'classnames';

import styles from './SkipButton.module.css';

import { ArrowIcon } from '@/shared/ui/Icons';

type SkipButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const SkipButton: React.FC<SkipButtonProps> = ({ className, children, ...props }) => {
  return (
    <button className={cn(styles.button, className)} {...props}>
      {children}
      <ArrowIcon className={styles.arrow} />
    </button>
  );
};
