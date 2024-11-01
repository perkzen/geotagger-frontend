import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Add } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { useSuspenseQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import Avatar from '@/components/ui/avatar/avatar';
import { profileQueryOptions } from '@/lib/api/profile/hooks';
import { Routes } from '@/lib/constants/routes';
import styles from './user-points.module.scss';

type UserPointsProps = {
  showAvatar?: boolean;
  showButton?: boolean;
  className?: string;
};

const UserPoints: FC<UserPointsProps> = ({
  showAvatar = false,
  showButton = false,
  className,
}) => {
  const { push } = useRouter();
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  return (
    <div
      className={classNames(styles.container, className, {
        [styles.withAvatar]: showAvatar,
        [styles.withButton]: showButton,
      })}
    >
      {showAvatar && (
        <Link href={Routes.PROFILE}>
          <Avatar src={profile?.imageUrl} size={'sm'} />
        </Link>
      )}
      <Typography variant="body1" className={styles.points}>
        {profile?.points}
      </Typography>
      {showButton && (
        <IconButton
          className={styles.add}
          onClick={() => push(Routes.ADD_LOCATION)}
        >
          <Add />
        </IconButton>
      )}
    </div>
  );
};

export default UserPoints;
