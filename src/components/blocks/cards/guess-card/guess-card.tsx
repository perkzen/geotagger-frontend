import { FC } from 'react';
import Image from 'next/image';
import { LockOutlined } from '@mui/icons-material';
import PlaceholderLocation from 'public/images/location-1.jpeg';
import styles from './guess-card.module.scss';

type GuessCardProps = {
  image?: string;
  isLocked?: boolean;
};

const GuessCard: FC<GuessCardProps> = ({ isLocked }) => {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={PlaceholderLocation}
          alt={'guess-location'}
          quality={100}
          fill
        />
      </div>
      {isLocked && <LockOutlined className={styles.icon} />}
    </div>
  );
};

export default GuessCard;
