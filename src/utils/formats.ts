export const formatFileSize = (
  value: number,
  decimalPlaces: number = 2,
): string => {
  if (value < 0) return "Invalid size";
  if (value === 0) return "0";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(value) / Math.log(k));
  return (
    parseFloat((value / Math.pow(k, i)).toFixed(decimalPlaces)) + " " + sizes[i]
  );
};

export const fromCharCode = (code: number): string => String.fromCharCode(code);

export const dateTimeFormats = (): string[] => {
  return [
    "YYYY-MM-DD",
    "MM/DD/YYYY",
    "DD/MM/YYYY",
    "YYYY-MM-DD HH:mm:ss",
    "YYYY-mm-dd H:MM:SS",
    "MM/DD/YYYY hh:mm A",
    "DD/MM/YYYY HH:mm",
    "MMMM D, YYYY",
    "D MMMM YYYY",
    "ddd, MMM D, YYYY",
    "YYYY-MM-DDTHH:mm:ssZ",
    "HH:mm:ss",
    "hh:mm A",
  ];
};

export const fileNameFromPath = (path: string) => {
  const fileArray = path.split("/");
  return fileArray[fileArray.length - 1];
};

export const formatDate = (
  dateString: string,
  format:
    | "default"
    | "dateOnly"
    | "timeOnly"
    | "monthYear"
    | "monthDayYear"
    | "monthDayTime"
    | "dayTime"
    | "monthDay"
    | "custom"
    | "shortDateTime" = "default",
  customFormat?: Intl.DateTimeFormatOptions,
): string => {
  const date = new Date(dateString);

  const defaultTimeFormat: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const defaultDateFormat: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  // Pre-calculate all possible values
  const timeFormatted = date
    .toLocaleString("en-US", defaultTimeFormat)
    .toLowerCase();
  const dateFormatted = date.toLocaleString("en-US", defaultDateFormat);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const year = date.getFullYear().toString().padStart(2, "0");
  const shortDateTimeFormatted = `${day} ${month} ${hours}:${minutes}`;
  const dayTime = `${day} · ${hours}:${minutes}`;
  const monthYear = `${month} · ${year}`;
  const monthDay = `${day} · ${month}`;
  const monthDayYear = `${day} ${month} · ${year}`;
  const monthDayTime = `${day} ${month} · ${hours}:${minutes}`;

  let result: string;

  switch (format) {
    case "dateOnly":
      result = dateFormatted;
      break;
    case "timeOnly":
      result = timeFormatted;
      break;
    case "shortDateTime":
      result = shortDateTimeFormatted;
      break;
    case "monthDayTime":
      result = monthDayTime;
      break;
    case "monthYear":
      result = monthYear;
      break;
    case "dayTime":
      result = dayTime;
      break;
    case "monthDay":
      result = monthDay;
      break;
    case "monthDayYear":
      result = monthDayYear;
      break;
    case "custom":
      result = date.toLocaleString("en-US", customFormat);
      break;
    case "default":
    default:
      result = `${timeFormatted} · ${dateFormatted}`;
      break;
  }

  return result;
};

export const displayDateTime = (from: string, to: string) => {
  const oneYear = 365 * 24 * 60 * 60 * 1000;
  const start = new Date(from).getTime();
  const stop = new Date(to).getTime();
  const range = stop - start;
  const greaterThanyear = range >= oneYear;
  return `  ${formatDate(from, greaterThanyear ? "monthDayYear" : "shortDateTime")}-
              ${formatDate(to, greaterThanyear ? "monthDayYear" : "shortDateTime")}`;
};

export const getRelativeDateLabel = (
  date: Date,
  includeTime: boolean = false,
  dateOnly: boolean = false,
): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  // Format time if needed
  const getTimeString = () => {
    if (!includeTime) return "";
    return ` at ${date.toLocaleTimeString("default", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };
  if (!dateOnly) {
    if (diffInSeconds < 30) {
      return "just now";
    }
    if (diffInSeconds < 60) {
      return "less than a minute ago";
    }
    if (diffInMinutes === 1) {
      return "1 minute ago";
    }
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    }

    // For hours
    if (diffInHours === 1) {
      return `1 hour ago${getTimeString()}`;
    }
    if (diffInHours < 24) {
      return `${diffInHours} hours ago${getTimeString()}`;
    }
  }
  // For very recent times

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const thisWeekStart = new Date(today);
  thisWeekStart.setDate(today.getDate() - today.getDay());

  const lastWeekStart = new Date(thisWeekStart);
  lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastMonthStart = new Date(thisMonthStart);
  lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  if (diffInDays === 0) {
    return `Today${getTimeString()}`;
  }

  // For days
  if (diffInDays === 1) {
    return `Yesterday${getTimeString()}`;
  }

  // For weeks and months
  if (normalizedDate >= thisWeekStart) {
    return `This Week${getTimeString()}`;
  }
  if (normalizedDate >= lastWeekStart) {
    return `Last Week${getTimeString()}`;
  }
  if (normalizedDate >= thisMonthStart) {
    return `This Month${getTimeString()}`;
  }
  if (normalizedDate >= lastMonthStart) {
    return `Last Month${getTimeString()}`;
  }

  // For dates more than 2 months ago
  const diffInMonths =
    (now.getFullYear() - date.getFullYear()) * 12 +
    (now.getMonth() - date.getMonth());

  if (diffInMonths < 12) {
    return `${diffInMonths} months ago${getTimeString()}`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  if (diffInYears === 1) {
    return `1 year ago${getTimeString()}`;
  }
  if (diffInYears < 5) {
    return `${diffInYears} years ago${getTimeString()}`;
  }

  // For very old dates
  if (includeTime) {
    return date.toLocaleString("default", {
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
};
