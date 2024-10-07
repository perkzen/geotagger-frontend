import { ReactNode } from 'react';
import Image from 'next/image';
import Navbar from '@/components/ui/navbar/navbar';
import Background from 'public/images/background.svg';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div>
        <Navbar className={styles.navbar} actions={false} />
        <main>{children}</main>
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
