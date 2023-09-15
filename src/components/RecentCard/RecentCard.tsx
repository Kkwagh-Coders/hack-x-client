import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { getItems } from '../../services/DashboardService/getItems';
import styles from './RecentCard.module.css';

function RecentCard() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getItems().then((res) => {
      setDataSource(res.products.splice(0, 8));
      setLoading(false);
    });
  }, []);

  return (
    <div className={styles.recentCard}>
      <h2 className={styles.cardTitle}>Recent Actions</h2>
      <Table
        className={styles.table}
        columns={[
          {
            title: 'Name',
            dataIndex: 'title',
          },

          {
            title: 'UserId',
            dataIndex: 'quantity',
          },

          {
            title: 'Action',
            dataIndex: 'discountedPrice',
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
}

export default RecentCard;
