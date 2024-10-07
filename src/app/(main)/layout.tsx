import { ReactNode } from 'react';
import Navbar from '@/components/ui/navbar/navbar';
import styles from './layout.module.scss';
import Footer from '@/components/ui/footer/footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
