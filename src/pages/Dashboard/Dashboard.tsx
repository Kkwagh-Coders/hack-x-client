import { IconType } from 'react-icons';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { GoAlertFill } from 'react-icons/go';
import { GrUserWorker } from 'react-icons/gr';
import { MdAdminPanelSettings } from 'react-icons/md';
import RecentCard from '../../components/RecentCard/RecentCard';
import Card from '../../components/card/Card';
import PieChartBox from '../../components/piechartbox/PieChart';
import styles from './Dashboard.module.css';

interface Card {
  CardTitle: string;
  CardIcon: IconType;
  CardCount: number;
}

const cardData: Card[] = [
  {
    CardTitle: 'Teacher',
    CardIcon: FaChalkboardTeacher,
    CardCount: 10,
  },
  {
    CardTitle: 'Staff',
    CardIcon: GrUserWorker,
    CardCount: 5,
  },
  {
    CardTitle: 'Admin',
    CardIcon: MdAdminPanelSettings,
    CardCount: 8,
  },
  {
    CardTitle: 'Alert',
    CardIcon: GoAlertFill,
    CardCount: 8,
  },
];

function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <div className={`${styles.box} ${styles.box1}`}>
        <Card
          cardTitle={cardData[0].CardTitle}
          CardIcon={cardData[0].CardIcon}
          cardCount={cardData[0].CardCount}
        />
      </div>
      <div className={`${styles.box} ${styles.box2}`}>
        <Card
          cardTitle={cardData[1].CardTitle}
          CardIcon={cardData[1].CardIcon}
          cardCount={cardData[1].CardCount}
        />
      </div>
      <div className={`${styles.box} ${styles.box3}`}>
        <Card
          cardTitle={cardData[2].CardTitle}
          CardIcon={cardData[2].CardIcon}
          cardCount={cardData[2].CardCount}
        />
      </div>
      <div className={`${styles.box} ${styles.box4}`}>
        <Card
          cardTitle={cardData[3].CardTitle}
          CardIcon={cardData[3].CardIcon}
          cardCount={cardData[3].CardCount}
        />
      </div>
      <div className={`${styles.box} ${styles.box5}`}>
        <RecentCard />
      </div>
      <div className={`${styles.box} ${styles.box6}`}>
        <PieChartBox />
      </div>
      <div className={`${styles.box} ${styles.box7}`}>7</div>
      <div className={`${styles.box} ${styles.box8}`}>8</div>
      <div className={`${styles.box} ${styles.box9}`}>9</div>
    </div>
  );
}

export default Dashboard;
