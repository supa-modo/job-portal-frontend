import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  addWeeks,
  addDays,
  isSameMonth,
  isSameDay,
  differenceInMinutes,
  parseISO,
} from "date-fns";

export const getWeekDays = (date) => {
  const start = startOfWeek(date);
  const end = endOfWeek(date);
  return eachDayOfInterval({ start, end });
};

export const getMonthDays = (date) => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  return eachDayOfInterval({ start, end });
};

export const formatDate = (date, formatString) => {
  return format(date, formatString);
};

export const navigateDate = (date, view, direction) => {
  switch (view) {
    case "day":
      return direction === "prev" ? addDays(date, -1) : addDays(date, 1);
    case "week":
      return direction === "prev" ? addWeeks(date, -1) : addWeeks(date, 1);
    case "month":
      return direction === "prev" ? addMonths(date, -1) : addMonths(date, 1);
  }
};

export const getEventStyle = (event) => {
  const start = parseISO(event.start);
  const end = parseISO(event.end);
  const duration = differenceInMinutes(end, start);
  const height = `${duration}px`;
  const top = `${start.getHours() * 60 + start.getMinutes()}px`;

  return { height, top };
};

export { isSameMonth, isSameDay };
