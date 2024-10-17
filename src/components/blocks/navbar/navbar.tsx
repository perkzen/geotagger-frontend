import { FC,} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';
import Logo from 'public/images/logo.svg';
import NavbarItems from '@/components/blocks/navbar/navbar-items/navbar-items';
import { Routes } from '@/lib/constants/routes';
import styles from './navbar.module.scss';

type NavbarProps = {
  className?: string;
  actions?: boolean;
};

const Navbar: FC<NavbarProps> = ({ className, actions }) => {
  return (
    <nav className={classNames(styles.container, className)}>
      <Link href={Routes.HOME}>
        <Image src={Logo} alt={'logo'} quality={100} className={styles.logo} />
      </Link>
      <NavbarItems actions={actions} />
    </nav>
  );
};

export default Navbar;
