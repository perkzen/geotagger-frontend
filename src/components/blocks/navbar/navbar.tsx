import { FC, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import Logo from 'public/images/logo.svg';
import { Routes } from '@/lib/constants/routes';
import styles from './navbar.module.scss';

type NavbarProps = {
  className?: string;
  items?: ReactNode;
};

const Navbar: FC<NavbarProps> = ({ className,  items }) => {
  return (
    <nav className={classNames(styles.container, className)}>
      <Link href={Routes.HOME}>
        <Image src={Logo} alt={'logo'} quality={100} className={styles.logo} />
      </Link>
      {items}
    </nav>
  );
};

export default Navbar;
