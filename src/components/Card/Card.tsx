import { IconType } from 'react-icons';
import styles from './card.module.css';

type Props = {
  cardTitle: string;
  CardIcon: IconType;
  cardCount: number;
};
function Card({ cardTitle, CardIcon, cardCount }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <CardIcon className={styles.cardIcon} />
      </div>
      <div className={styles.cardInner}>
        <h1 className={styles.cardCount}>{cardCount}</h1>
        <h3>{cardTitle}</h3>
      </div>
    </div>
  );
}

export default Card;
