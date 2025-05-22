import React from 'react';

import cn from 'classnames';

import styles from './PrimaryButton.module.css';

import { Spinner } from '@/shared/ui/Spinner';

interface PrimaryButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  loading?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  children,
  loading,
  ...props
}) => {
  return (
    <button className={cn(styles.button, className)} disabled={loading} {...props}>
      {loading ? <Spinner /> : children}
    </button>
  );
};
