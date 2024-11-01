import { FC } from 'react';
import { Search } from '@mui/icons-material';
import { Typography } from '@mui/material';
import classNames from 'classnames';
import styles from './empty-list.module.scss';

type EmptyTableProps = {
  title: string;
  description: string;
  className?: string;
};
const EmptyList: FC<EmptyTableProps> = ({ title, description, className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <Search color="primary" />
      <div className={styles.text}>
        <Typography variant="h5" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {description}
        </Typography>
      </div>
    </div>
  );
};

export default EmptyList;
