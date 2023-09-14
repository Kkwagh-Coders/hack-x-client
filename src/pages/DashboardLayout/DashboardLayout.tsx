import { Outlet } from 'react-router-dom';
import SideNavbar from '../../components/SideNavbar/SideNavbar';
import styles from './DashboardLayout.module.css';

function DashboardLayout() {
  return (
    <div className={styles.Dashboard}>
      <SideNavbar />
      <div className={styles.dashboardMainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
