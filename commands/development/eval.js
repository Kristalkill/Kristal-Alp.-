module.exports = {
  name: 'eval',
  description: 'eval',
  aliases: ["e"],
  public: false,
  async execute(Main, message, args) {
    if (!config.owner.includes(message.author.id))return message.channel.send('Ти не овнер а гавно')
    try {
let evaled = eval(args.join(' '));
if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled
let eevaled = typeof evaled;
const tyype = eevaled[0].toUpperCase() + eevaled.slice(1)
if(evaled === `undefined`) evaled = `Undefined`
message.channel.send(`
Successfully ✅
Type: ${tyype}
Done for: ${new Date().getTime() - message.createdTimestamp + 'ms'}
\n${evaled}`, {code: 'js', split: '\n'}).then(() => message.react("✅"))
} catch(err) {
message.channel.send(`Error ❎
\n${err}`, {code: "js", split: "\n"}).then(() => message.react("❎"))}
}
};
