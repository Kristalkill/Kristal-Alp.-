module.exports =
 function formatDate(date) {
  if (typeof date == 'number') {
    date = new Date(date * 1000);
  } else if (typeof date == 'string') {
    date = new Date(date);
  } else if (Array.isArray(date)) {
    date = new Date(date[2], date[1], date[0]);
  }
  return date.toLocaleString("ru", {day: '2-digit', month: '2-digit', year: '2-digit'});
}
