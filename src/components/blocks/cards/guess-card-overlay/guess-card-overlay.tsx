import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next-nprogress-bar';
import { Button } from '@mui/material';
import classNames from 'classnames';
import { Routes } from '@/lib/constants/routes';
import styles from './guess-card-overlay.module.scss';

type GuessCardOverlayProps = {
  locationId: string;
  isHovering: boolean;
  size?: 'md' | 'lg';
};

const GuessCardOverlay: FC<GuessCardOverlayProps> = ({
  locationId,
  isHovering,
  size = 'md',
}) => {
  const t = useTranslations();
  const { push } = useRouter();

  return (
    <div
      className={classNames(styles.container, {
        [styles.visible]: isHovering,
        [styles.md]: size === 'md',
        [styles.lg]: size === 'lg',
      })}
    >
      <Button
        variant="contrast"
        onClick={() => push(`${Routes.LOCATION}/${locationId}`)}
      >
        {t('location.guess.guess')}
      </Button>
    </div>
  );
};

export default GuessCardOverlay;
