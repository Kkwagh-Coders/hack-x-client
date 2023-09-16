import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useAppSelector } from '../../redux/store';
import {
  getNotifications,
  getUnreadNotification,
} from '../../services/notification';
import { getNormalFormattedDate } from '../../utils/getFormattedDate';
import styles from './Notification.module.css';

function NotificationList() {
  const { data } = useQuery(['notifications'], getNotifications);

  return (
    <div className={styles.NotificationList}>
      <div>
        {data?.map((notification) => (
          <div
            key={`${notification.text}#${notification.createdAt}`}
            className={styles.notificationCard}
          >
            {notification.type === 'low-inventory' ? (
              <FiAlertCircle className={styles.notificationIcon} />
            ) : (
              <AiOutlineMessage
                className={styles.notificationIcon}
                style={{
                  color: '#3c8aa3',
                }}
              />
            )}

            <div className={styles.notificationContent}>
              <p className={styles.notificationText}>{notification.text}</p>
              <p className={styles.notificationCreatedAt}>
                {getNormalFormattedDate(notification.createdAt)}
              </p>
              <div className={styles.notificationLine}> </div>
            </div>
          </div>
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
    return <div> </div>;
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
