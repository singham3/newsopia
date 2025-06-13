import moment from 'moment';

export const formatTimestamp = (timestamp: number): string => {
  return moment(timestamp).format('h:mm a [on] ddd D MMM, YYYY');
};

// Example usage:
// const formattedDate = formatTimestamp(1743485913000);
// Output: "11:08 am on Tue 1 Apr, 2025"