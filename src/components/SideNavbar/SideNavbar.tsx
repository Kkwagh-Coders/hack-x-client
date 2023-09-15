import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { FiMenu, FiUsers } from 'react-icons/fi';
import { GoLog } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { MdOutlineInventory, MdOutlineSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';
import CustomSidebarLink from '../CustomSidebarLink/CustomSidebarLink';
import LogoutButton from '../LogoutButton/LogoutButton';
import styles from './SideNavbar.module.css';

const navBarLinks = [
  {
    title: 'Dashboard',
    Icon: MdOutlineSpaceDashboard,
    link: '/dashboard',
  },
  {
    title: 'Inventory',
    Icon: MdOutlineInventory,
    link: '/dashboard/inventory',
  },
  {
    title: 'Users',
    Icon: FiUsers,
    link: '/dashboard/users',
  },
  {
    title: 'Log',
    Icon: GoLog,
    link: '/dashboard/log',
  },
  {
    title: 'Alerts',
    Icon: IoMdNotificationsOutline,
    link: '/dashboard/alert',
  },
];

function SideNavbar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((state) => !state);
  };

  const closeSideBar = () => {
    setIsSideBarOpen(false);
  };

  return (
    <>
      <nav
        className={`${styles.SideNavbar} ${
          isSideBarOpen ? styles.sideNavbarOpen : ''
        }`}
      >
        <div className={styles.logo}>
          <div>
            <FiMenu className={styles.menuIcon} onClick={toggleSidebar} />
            <Link to="/dashboard">
              <span className={styles.logoName}>Hack X</span>
            </Link>

            <IoMdNotificationsOutline />
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <FiMenu className={styles.menuIcon} onClick={toggleSidebar} />
            <span className={styles.logoName}>Hack X</span>
          </div>

          <div className={styles.sidebarContent}>
            <ul className={styles.lists}>
              {navBarLinks?.map(({ title, Icon, link }) => (
                <CustomSidebarLink
                  path={link}
                  key={title}
                  className={styles.list}
                  activeClassName={styles.activeList}
                  onClickCallback={closeSideBar}
                >
                  <Icon className={styles.navIcon} />
                  <span className={styles.link}>{title}</span>
                </CustomSidebarLink>
              ))}
            </ul>
            <div className={styles.bottomContent}>
              <li className={styles.list}>
                <Link to="/" className={styles.navLink}>
                  <AiOutlineHome className={styles.navIcon} />
                  <span className={styles.link}>Home</span>
                </Link>
              </li>
              <li className={styles.list}>
                <LogoutButton
                  className={styles.navLink}
                  onClickCallback={() => console.log('Logout')}
                >
                  <>
                    <BiLogOut className={styles.navIcon} />
                    <span className={styles.link}>Logout</span>
                  </>
                </LogoutButton>
              </li>
            </div>
          </div>
        </div>
      </nav>

      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <section
        role="button"
        tabIndex={0}
        className={styles.overlay}
        onClick={closeSideBar}
        onKeyDown={closeSideBar}
      />
    </>
  );
}

export default SideNavbar;
