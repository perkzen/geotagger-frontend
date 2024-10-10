import { ReactNode } from 'react';
import Footer from '@/components/blocks/footer/footer';
import Navbar from '@/components/blocks/navbar/navbar';
import styles from './layout.module.scss';

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
