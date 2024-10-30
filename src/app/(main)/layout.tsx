import { ReactNode } from 'react';
import Footer from '@/components/blocks/footer/footer';
import Navbar from '@/components/blocks/navbar/navbar';
import NavbarItems from '@/components/blocks/navbar/navbar-items/navbar-items';
import { getSession } from '@/lib/server/session';
import styles from './layout.module.scss';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <div className={styles.container}>
      <Navbar items={<NavbarItems session={session} />} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
