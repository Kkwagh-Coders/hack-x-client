import { useQuery } from '@tanstack/react-query';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { MdAdminPanelSettings, MdOutlineInventory } from 'react-icons/md';
import Card from '../../components/Card/Card';
import PieChartBox from '../../components/PiechartBox/PieChart';
import RecentCard from '../../components/RecentCard/RecentCard';
import { getCardData } from '../../services/dashboard.services';
import styles from './Dashboard.module.css';

function Dashboard() {
  const { data } = useQuery(['user-count'], getCardData);

  return (
    <div className={styles.Dashboard}>
      <Card
        className={`${styles.box} ${styles.box1} ${styles.adminCard}`}
        cardTitle="Admin"
        CardIcon={MdAdminPanelSettings}
        cardCount={data?.admin.toString() || '-'}
      />

      <Card
        className={`${styles.box} ${styles.box2} ${styles.staffCard}`}
        cardTitle="Staff"
        CardIcon={BsFillPersonVcardFill}
        cardCount={data?.staff.toString() || '-'}
      />

      <Card
        className={`${styles.box} ${styles.box3} ${styles.teacherCard}`}
        cardTitle="Teacher"
        CardIcon={FaChalkboardTeacher}
        cardCount={data?.teacher.toString() || '-'}
      />

      <Card
        className={`${styles.box} ${styles.box4} ${styles.inventoryCard}`}
        cardTitle="Inventory Count"
        CardIcon={MdOutlineInventory}
        cardCount={data?.inventoryCount.toString() || '-'}
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
