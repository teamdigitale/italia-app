export const isInGracePeriod = (endDate: Date, gracePeriod: number) => {
  if (isNaN(endDate.getTime()) || isNaN(gracePeriod)) {
    return false;
  }

  const actualDate = new Date();
  const gracePeriodDate = new Date(endDate.getTime());
  gracePeriodDate.setDate(endDate.getDate() + gracePeriod);

  return (
    actualDate.getTime() >= endDate.getTime() &&
    actualDate.getTime() <= gracePeriodDate.getTime()
  );
};
