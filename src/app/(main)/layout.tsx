import { ReactNode } from 'react';
import Navbar from '@/components/ui/navbar/navbar';
import Footer from '@/components/ui/footer/footer';
import styles from './layout.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
