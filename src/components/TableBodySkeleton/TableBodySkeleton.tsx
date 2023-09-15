import styles from './TableBodySkeleton.module.css';

type Props = {
  columnCount: number;
};

const getRandomNumber = (min: number, max: number): number => {
  if (min >= max) {
    throw new Error('Minimum value must be less than maximum value');
  }

  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomFraction = Math.random();

  // Scale the random number to fit within the desired range
  const randomInRange = min + randomFraction * (max - min);

  return randomInRange;
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
          <td key={i}>
            <p
              style={{
                width: `${getRandomNumber(50, 100)}%`,
              }}
              className={`${styles.postTitle} ${styles.postSkeleton}`}
            >
              {' '}
            </p>
          </td>
        ))}
      </tr>
      <tr>
        {rowElements.map((i) => (
          <td key={i}>
            <p
              style={{
                width: `${getRandomNumber(50, 100)}%`,
              }}
              className={`${styles.postTitle} ${styles.postSkeleton}`}
            >
              {' '}
            </p>
          </td>
        ))}
      </tr>
      <tr>
        {rowElements.map((i) => (
          <td key={i}>
            <p
              style={{
                width: `${getRandomNumber(50, 100)}%`,
              }}
              className={`${styles.postTitle} ${styles.postSkeleton}`}
            >
              {' '}
            </p>
          </td>
        ))}
      </tr>
      <tr>
        {rowElements.map((i) => (
          <td key={i}>
            <p className={`${styles.postTitle} ${styles.postSkeleton}`}> </p>
          </td>
        ))}
      </tr>
    </>
  );
}

export default TableBodySkeleton;
