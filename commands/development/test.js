module.exports = {
  name: 'test',
  description: 'test',
  aliases: ["test","test"],
  public: false,
  async execute(Main, message, args) {
const check = (chars) => chars.split('').map( e => e.charCodeAt(0))
console.log(check(``))
  }
}