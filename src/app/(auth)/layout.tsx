import { ReactNode } from 'react';
import Image from 'next/image';
import Background from 'public/images/background.svg';
import Logo from 'public/images/logo.svg';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={Logo} alt={'logo'} quality={100} />
        {children}
      </div>
      <div className={styles.image}>
        <Image
          src={Background}
          alt="background"
          quality={100}
          objectFit={'cover'}
          fill
        />
      </div>
    </div>
  );
}
