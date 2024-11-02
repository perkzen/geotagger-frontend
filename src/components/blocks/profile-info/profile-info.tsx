'use client';
import { FC } from 'react';
import Link from 'next/link';
import { Typography, TypographyPropsVariantOverrides } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { OverridableStringUnion } from '@mui/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Avatar from '@/components/ui/avatar/avatar';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import styles from './profile-info.module.scss';

type ProfileInfoProps = {
  className?: string;
  href?: string;
  onClick?: () => void;
  avatar?: {
    size: 'md' | 'lg';
  };
  textVariant?: OverridableStringUnion<
    Variant | 'inherit',
    TypographyPropsVariantOverrides
  >;
};

const ProfileInfo: FC<ProfileInfoProps> = ({
  className,
  avatar,
  href,
  onClick,
  textVariant = 'h4',
}) => {
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  const content = (
    <div className={classNames(styles.container, className)}>
      <Avatar src={profile?.imageUrl} size={avatar?.size} />
      <Typography variant={textVariant}>
        {profile.firstname} {profile.lastname}
      </Typography>
    </div>
  );

  return href ? (
    <Link href={href} onClick={onClick}>
      {content}
    </Link>
  ) : (
    content
  );
};
export default ProfileInfo;
