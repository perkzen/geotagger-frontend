import { FC, ReactNode } from 'react';
import classNames from 'classnames';
import GuessCard, {
  GuessCardProps,
} from '@/components/blocks/cards/guess-card/guess-card';
import { BestScore } from '@/lib/api/locations/models';
import styles from './guesses-list.module.scss';

type GuessesListProps = {
  data: BestScore[];
  emptyComponent?: ReactNode;
  className?: string;
  itemProps?: Omit<GuessCardProps, 'score'>;
};

const GuessesList: FC<GuessesListProps> = ({
  data,
  emptyComponent,
  itemProps,
  className,
}) => {
  if (data.length === 0) {
    return emptyComponent;
  }

  return (
    <div className={classNames(styles.container, className)}>
      {data.map((score, index) => (
        <GuessCard {...itemProps} key={index} score={score} />
      ))}
    </div>
  );
};

export default GuessesList;
