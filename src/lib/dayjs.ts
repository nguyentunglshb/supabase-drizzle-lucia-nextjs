import dayjs from 'dayjs';

export const formatDate = (date?: Date) => {
  if (!date) return dayjs().format('DD/MM/YYYY');
  return dayjs(date).format('DD/MM/YYYY');
};
