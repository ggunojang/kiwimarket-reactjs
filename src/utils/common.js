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
