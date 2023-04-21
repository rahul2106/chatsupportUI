export const formatDate = (epoch) => {
  const date = new Date(Math.round(Number(epoch)));
  const formattedDate =
    date.getUTCDate() +
    "/" +
    (date.getUTCMonth() + 1) +
    "/" +
    date.getUTCFullYear();
  return formattedDate;
};
