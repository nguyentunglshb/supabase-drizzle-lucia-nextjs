import dayjs from 'dayjs';

export const formatDate = (date?: Date) => {
  if (!date) return dayjs().format('HH:mm:ss DD/MM/YYYY');
  return dayjs(date).format('HH:mm:ss DD/MM/YYYY');
};
