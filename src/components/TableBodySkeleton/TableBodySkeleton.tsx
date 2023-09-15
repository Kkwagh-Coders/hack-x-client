import styles from './TableBodySkeleton.module.css';

type Props = {
  columnCount: number;
};

function TableBodySkeleton({ columnCount }: Props) {
  const rowElements = [];
  for (let i = 0; i < columnCount; i += 1) {
    rowElements.push(i);
  }

  return (
    <>
      <tr>
        {rowElements.map((i) => (
          <td key={i} className={`${styles.postTitle} ${styles.postSkeleton}`}>
            {' '}
          </td>
        ))}
      </tr>
      <tr>
        {rowElements.map((i) => (
          <td key={i} className={`${styles.postTitle} ${styles.postSkeleton}`}>
            {' '}
          </td>
        ))}
      </tr>
      <tr>
        {rowElements.map((i) => (
          <td key={i} className={`${styles.postTitle} ${styles.postSkeleton}`}>
            {' '}
          </td>
        ))}
      </tr>
      <tr>
        {rowElements.map((i) => (
          <td key={i} className={`${styles.postTitle} ${styles.postSkeleton}`}>
            {' '}
          </td>
        ))}
      </tr>
    </>
  );
}

export default TableBodySkeleton;
