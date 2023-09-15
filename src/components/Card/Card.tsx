import { IconType } from 'react-icons';
import styles from './card.module.css';

type Props = {
  cardTitle: string;
  CardIcon: IconType;
  cardCount: number;
  className: string;
};
function Card({ cardTitle, CardIcon, cardCount, className }: Props) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.icon}>
        <CardIcon className={styles.cardIcon} />
      </div>
      <div className={styles.cardInner}>
        <h2 className={styles.cardCount}>{cardCount}</h2>
        <p className={styles.cardTitle}>{cardTitle}</p>
      </div>
    </div>
  );
}

export default Card;
