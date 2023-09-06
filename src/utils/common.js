export const numberFormat = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatBytes = (bytes, decimals) => {
  if (bytes === 0) {
    return "0 Byte";
  }
  var k = 1024; //Or 1 kilo = 1000
  var sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return (
    parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i]
  );
};

// 날짜 const date = new Date("2023-06-24 06:09:26.000000");
export const formatDate = (format, date) => {
  const options = {
    Y: date.getFullYear(),
    m: String(date.getMonth() + 1).padStart(2, "0"),
    d: String(date.getDate()).padStart(2, "0"),
    h: String(date.getHours()).padStart(2, "0"),
    i: String(date.getMinutes()).padStart(2, "0"),
    s: String(date.getSeconds()).padStart(2, "0"),
  };

  return format.replace(/Y|m|d|h|i|s/g, (match) => options[match]);
};

// 글자 자르기
export const truncateString = (str, num) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
};

// Agent 체크
export const parseUserAgent = () => {
  const userAgent = navigator.userAgent;
  const browserInfo =
    userAgent.match(
      /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
    ) || [];
  const platformInfo = userAgent.match(/(Mac|Win|Linux|Android|iPhone)/i) || [];

  const browserName = browserInfo[1];
  const browserVersion = browserInfo[2];
  const platform = platformInfo[1];

  return {
    browsername: browserName,
    browserversion: browserVersion,
    os: platform,
  };
};
