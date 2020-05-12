module.exports = {
  name: 'rps',
  description: 'Камень,ножницы,бумага.',
  aliases: ["кнб"],
  public: true,
  async execute(Main, message, args) {
let rps = ["камень", "ножницы", "бумага"];
let i;
if(!rps.includes(args[0])) return message.reply("Пожайлуста выберите: камень,ножницы,бумага.");
if(args[0].includes("камень")) {
i = 2;
}
if(args[0].includes("бумага")) {
i = 1;
}
if(args[0].includes("ножницы")) {
i = 0;
}
if(rps[i]) {
let comp = Math.floor((Math.random() * 3) + 1);
let comp_res = parseInt(comp) - parseInt("1");
let comp_val = rps[parseInt(comp_res)];
  if(i === comp_res) {
    return message.channel.send(`Ты выбрал**${args[0]}** и я выбрал **${comp_val}** и ничья,можетт попробуем ещо :?`);
  }
  if(i > comp_res) {
    return message.channel.send(`Ты выбра **${args[0]}** и я выбрал **${comp_val}** и я Победил! GGWP.`);
  }
  if(i < comp_res) {
    return message.channel.send(`Ты выбра **${args[0]}** and I chose **${comp_val}** и я проиграл! GGWP`);
  }
}
}
}
