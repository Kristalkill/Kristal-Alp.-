module.exports = {
  name: 'stopbot',
  description: 'eval',
  aliases: ["exit","sbot"],
  public: false,
  async execute(Main, message, args) {
process.exit()
}
}
