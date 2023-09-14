import { useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styles from './SideNavbar.module.css';

const navBarLinks = [
  {
    title: 'Dashboard',
    Icon: BiHomeAlt,
    link: '/',
  },
  {
    title: 'People',
    Icon: BiHomeAlt,
    link: '/',
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
          <FiMenu className={styles.menuIcon} onClick={toggleSidebar} />
          <span className={styles.logoName}>Hack X</span>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.logo}>
            <FiMenu className={styles.menuIcon} onClick={toggleSidebar} />
            <span className={styles.logoName}>Hack X</span>
          </div>

          <div className={styles.sidebarContent}>
            <ul className={styles.lists}>
              {navBarLinks?.map(({ title, Icon, link }) => (
                <li className={styles.list} key={title}>
                  <Link to={link} className={styles.navLink}>
                    <Icon className={styles.navIcon} />
                    <span className={styles.link}>{title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.bottomContent}>
              <li className={styles.list}>
                <Link to="/" className={styles.navLink}>
                  <BiHomeAlt className={styles.navIcon} />
                  <span className={styles.link}>Logout</span>
                </Link>
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
