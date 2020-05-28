module.exports =
function toNum(text) {
  return parseInt(text.replace(/[^\d]/g, ""));
}
