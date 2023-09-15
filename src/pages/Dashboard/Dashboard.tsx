import { IconType } from 'react-icons';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdAdminPanelSettings, MdOutlineInventory } from 'react-icons/md';
import Card from '../../components/Card/Card';
import PieChartBox from '../../components/PiechartBox/PieChart';
import RecentCard from '../../components/RecentCard/RecentCard';
import styles from './Dashboard.module.css';

interface CardType {
  CardTitle: string;
  CardIcon: IconType;
  CardCount: number;
}

const cardData: CardType[] = [
  {
    CardTitle: 'Admin',
    CardIcon: MdAdminPanelSettings,
    CardCount: 8,
  },
  {
    CardTitle: 'Staff',
    CardIcon: BsFillPersonVcardFill,
    CardCount: 1253,
  },
  {
    CardTitle: 'Teacher',
    CardIcon: FaChalkboardTeacher,
    CardCount: 3251,
  },
  {
    CardTitle: 'Inventory',
    CardIcon: MdOutlineInventory,
    CardCount: 123652,
  },
];

function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <Card
        className={`${styles.box} ${styles.box1} ${styles.adminCard}`}
        cardTitle={cardData[0].CardTitle}
        CardIcon={cardData[0].CardIcon}
        cardCount={cardData[0].CardCount}
      />

      <Card
        className={`${styles.box} ${styles.box2} ${styles.staffCard}`}
        cardTitle={cardData[1].CardTitle}
        CardIcon={cardData[1].CardIcon}
        cardCount={cardData[1].CardCount}
      />

      <Card
        className={`${styles.box} ${styles.box3} ${styles.teacherCard}`}
        cardTitle={cardData[2].CardTitle}
        CardIcon={cardData[2].CardIcon}
        cardCount={cardData[2].CardCount}
      />

      <Card
        className={`${styles.box} ${styles.box4} ${styles.inventoryCard}`}
        cardTitle={cardData[3].CardTitle}
        CardIcon={cardData[3].CardIcon}
        cardCount={cardData[3].CardCount}
      />

      <div className={`${styles.box} ${styles.box5}`}>
        <RecentCard />
      </div>
      <div className={`${styles.box} ${styles.box6}`}>
        <PieChartBox />
      </div>
    </div>
  );
}

export default Dashboard;
