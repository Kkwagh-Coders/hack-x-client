import { useRef, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import useOutsideAlerter from '../../hooks/useOutsideAlerter';
import { useAppSelector } from '../../redux/store';
import CustomNavLink from '../CustomNavLink/CustomNavLink';
import LogoutButton from '../LogoutButton/LogoutButton';
import styles from './Header.module.css';

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);

  const handleCloseNavbar = () => {
    setIsNavOpen(false);
  };

  // Navbar
  const navigationRef = useRef<HTMLDivElement>(null);
  useOutsideAlerter(navigationRef, handleCloseNavbar);

  const toggleNav = () => {
    setIsNavOpen((state) => !state);
  };

  return (
    <header className={styles.Header}>
      <div className={`container ${styles.navWrapper}`}>
        <Link to="/" className={styles.heading}>
          Inventory Management
        </Link>
        <button
          type="button"
          onClick={toggleNav}
          className={styles.mobileNavToggle}
          aria-controls="primary-navigation"
        >
          {!isNavOpen ? <RxHamburgerMenu /> : <MdOutlineClose />}
          <span className="visually-hidden">Menu</span>
        </button>

        {/* Div is used to provide backdrop shadow */}
        <div
          className={`${styles.backdrop} ${
            isNavOpen ? styles.backdropOpen : ''
          }`}
        >
          {' '}
        </div>

        <nav
          ref={navigationRef}
          className={`${styles.primaryNavigation} ${
            isNavOpen ? styles.primaryNavigationOpen : ''
          }`}
        >
          <ul className={styles.navList} id="primary-navigation">
            <CustomNavLink
              path="/"
              onClickCallback={handleCloseNavbar}
              className={styles.navItem}
              activeClassName={styles.navItemActive}
            >
              Home
            </CustomNavLink>

            {isLoggedIn ? (
              <CustomNavLink
                path="/dashboard"
                onClickCallback={handleCloseNavbar}
                className={styles.navItem}
                activeClassName={styles.navItemActive}
              >
                Dashboard
              </CustomNavLink>
            ) : null}
          </ul>
          <div className={styles.buttons}>
            {!isLoggedIn ? (
              <Link
                to="/login"
                onClick={handleCloseNavbar}
                className={`default-button default-outline-button ${styles.authButton}`}
              >
                Login
              </Link>
            ) : (
              <LogoutButton
                className={`default-button ${styles.authButton}`}
                onClickCallback={handleCloseNavbar}
              >
                Logout
              </LogoutButton>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
