import { useQuery } from '@tanstack/react-query';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { getCategoryData } from '../../services/inventory.services';
import getColors from '../../utils/getColors';
import styles from './piechart.module.css';

function PieChartBox() {
  const { data } = useQuery(['category-count'], getCategoryData);

  const pieChartData = [];
  if (data) {
    for (let i = 0; i < data?.length; i += 1) {
      pieChartData.push({
        name: data[i].name,
        value: data[i].value,
        color: getColors(i),
      });
    }
  }

  return (
    <div className={styles.PieChartBox}>
      <h2>Categories</h2>
      <div className={styles.chart}>
        <ResponsiveContainer width="99%" height={300}>
          <PieChart>
            <Tooltip
              contentStyle={{ background: 'white', borderRadius: '5px' }}
            />
            <Pie
              data={pieChartData}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={5}
              dataKey="value"
            >
              {pieChartData?.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.options}>
        {pieChartData.map((item) => (
          <div className={styles.option} key={item.name}>
            <div className={styles.title}>
              <div
                className={styles.dot}
                style={{ backgroundColor: item.color }}
              />
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PieChartBox;
