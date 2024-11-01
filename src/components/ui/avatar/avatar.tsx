import { FC } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import AvatarPlaceholder from 'public/images/avatar.svg';
import styles from './avatar.module.scss';

type AvatarProps = {
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
};

const sizes = {
  sm: 36,
  md: 40,
  lg: 64,
};

const Avatar: FC<AvatarProps> = ({ size = 'md', src }) => {
  return (
    <Image
      className={classNames(styles.container)}
      src={src ?? AvatarPlaceholder}
      alt={'Avatar'}
      width={sizes[size]}
      height={sizes[size]}
    />
  );
};

export default Avatar;
