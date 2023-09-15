import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './piechart.module.css';

const data = [
  { name: 'autoCAD', value: 400, color: '#0088FE' },
  { name: 'Fusion360', value: 300, color: '#00C49F' },
  { name: 'Unity', value: 300, color: '#FFBB28' },
  { name: 'Windows', value: 200, color: '#FF8042' },
  // { name: "Visual Studio", value: 100, color: "#FF34503"}
];

function PieChartBox() {
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
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className={styles.options}>
        {data.map((item) => (
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
