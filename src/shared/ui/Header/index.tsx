import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import styles from './index.module.css';

import logoIcon from './logo.svg';

export const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <Image src={logoIcon} alt="logo" width={118} height={30} />
      </Link>
    </header>
  );
};
