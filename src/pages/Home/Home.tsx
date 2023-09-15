import { Link } from 'react-router-dom';
import costIcon from '../../assets/images/home/facilities/cost.png';
import reportIcon from '../../assets/images/home/facilities/report.png';
import searchIcon from '../../assets/images/home/facilities/search.png';
import userIcon from '../../assets/images/home/facilities/user.png';

import LoginRequiredLink from '../../components/LoginRequiredLink/LoginRequiredLink';
import styles from './Home.module.css';

function Home() {
  return (
    <div className={styles.Home}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.title}>
            <span>Simplify Inventory with</span>
            <span className={styles.underlineSpan}>Inventory Management</span>
          </h1>
          <p>
            Inventory Management System offers real-time tracking, intuitive
            interfaces, and powerful reporting tools. Optimize your inventory,
            reduce costs, and boost efficiency. Say goodbye to stock issues –
            try it now!
          </p>
          <div className={styles.heroActionButtons}>
            <LoginRequiredLink
              textContent="Dashboard"
              to="/dashboard"
              className={`default-button ${styles.exploreButton}`}
            />
          </div>
        </div>
      </section>

      <section className={styles.facilities} id="aim">
        <div className="container">
          <h2>
            <span>Improve your Inventory Game</span>
            <span className={styles.underlineSpan}>
              with our Inventory Management System
            </span>
          </h2>
          <div className={styles.facilitiesContainer}>
            <div className={styles.facility}>
              <img src={searchIcon} alt="" />
              <h3>Inventory Tracking</h3>
              <p>
                Gain real-time visibility into your stock levels, ensuring you
                never run out of essential items or overstock your shelves.
              </p>
            </div>
            <div className={styles.facility}>
              <img src={reportIcon} alt="" />
              <h3>Reporting and Analytics</h3>
              <p>
                Harness the power of data with in-depth reports and analytics,
                allowing you to make informed decisions and optimize your
                inventory strategy.
              </p>
            </div>
            <div className={styles.facility}>
              <img src={userIcon} alt="" />
              <h3>User-Friendly Interface</h3>
              <p>
                Navigate our system effortlessly with an intuitive user
                interface designed to simplify inventory management tasks.
              </p>
            </div>
            <div className={styles.facility}>
              <img src={costIcon} alt="" />
              <h3>Cost Control</h3>
              <p>
                Take control of your budget by identifying cost-saving
                opportunities and reducing excess inventory, all within our
                Inventory Management System.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.footer}>
        <div className="container">
          <div className={styles.footerContainer}>
            <div className={styles.info}>
              <h2>Inventory Management</h2>
              <p>
                Experience seamless inventory management and control with our
                system. Elevate your business efficiency today!
              </p>
            </div>

            <div className={styles.links}>
              <h2>Links</h2>
              <Link to="/credits">Credits</Link>
              <a href="mailto:suhaanbhandary1@gmail.com">Contact Us</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.copyRight}>
        <div className="container">
          <p>Inventory Management</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
