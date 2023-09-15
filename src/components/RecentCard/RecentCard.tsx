import { useQuery } from '@tanstack/react-query';
import { Table } from 'antd';
import { getInventoryLogDashboard } from '../../services/inventory.services';
import styles from './RecentCard.module.css';

function RecentCard() {
  const { data, isLoading } = useQuery(['inventory-log'], () =>
    getInventoryLogDashboard(),
  );

  const dataSource = [];

  if (data) {
    for (let i = 0; i < data?.length; i += 1) {
      dataSource.push({
        user: data[i].userId.firstName,
        item: data[i].newItem.name || data[i].oldItem.name,
        action: data[i].action,
      });
    }
  }

  return (
    <div className={styles.recentCard}>
      <h2 className={styles.cardTitle}>Recent Actions</h2>
      <Table
        className={styles.table}
        columns={[
          {
            title: 'User',
            dataIndex: 'user',
          },
          {
            title: 'Item',
            dataIndex: 'item',
          },

          {
            title: 'Action',
            dataIndex: 'action',
          },
        ]}
        loading={isLoading}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
}

export default RecentCard;
