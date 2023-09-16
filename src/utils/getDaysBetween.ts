const getDaysBetween = (date1: Date, date2: Date) => {
  const differenceInTime = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.floor(differenceInDays);
};

export default getDaysBetween;
