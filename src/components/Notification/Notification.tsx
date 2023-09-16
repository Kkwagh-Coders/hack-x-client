import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useAppSelector } from '../../redux/store';
import {
  getNotifications,
  getUnreadNotification,
} from '../../services/notification';
import styles from './Notification.module.css';

function NotificationList() {
  const { data } = useQuery(['notifications'], getNotifications);

  return (
    <div className={styles.NotificationList}>
      <h3>Alerts</h3>
      <div>
        {data?.map((notification) => (
          <p
            key={notification.text}
            className={!notification.isViewed ? styles.notViewed : ''}
          >
            {notification.text}
          </p>
        ))}
      </div>
    </div>
  );
}

function Notification() {
  const role = useAppSelector((state) => state.userState.user?.role);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data } = useQuery(
    ['unread-notification-count'],
    getUnreadNotification,
  );

  const handleToggleNotification = () => {
    setIsNotificationOpen((state) => !state);
  };

  if (!role || role === 'teacher') {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }

  return (
    <div className={styles.Notification}>
      <div>
        <IoMdNotificationsOutline
          className={styles.logo}
          onClick={handleToggleNotification}
        />
        {data && data > 0 ? (
          <button
            type="button"
            className={styles.dot}
            onClick={handleToggleNotification}
          >
            {data}
          </button>
        ) : null}
      </div>
      {isNotificationOpen ? <NotificationList /> : null}
    </div>
  );
}

export default Notification;
