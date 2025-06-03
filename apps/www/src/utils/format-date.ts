import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function formatDate(date: string) {
  const dateFormat = "MMMM D, YYYY";
  const timezone = "America/New_York";

  return dayjs(date).tz(timezone).format(dateFormat);
}
