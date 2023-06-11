export const convertUnixTime = (unixTime) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const timeStr = unixTime.match(/\d/g);

  timeStr.splice(-4);

  const dateCheck = new Date(Number(timeStr.join("")));

  const finalFormattedDate = `${dateCheck.getDate()} ${
    months[dateCheck.getMonth()]
  } ${dateCheck.getFullYear()}`;

  return finalFormattedDate;
};
