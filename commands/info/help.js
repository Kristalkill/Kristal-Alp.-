module.exports = {
    name: "help",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["h"],
    public: true,
    async execute(Main, message, args) {
        function list(cat, cname) {
            return `**${cname}**: ${Main.commands.filter(cmd => cmd.category == cat).map(cmd => `\`${cmd.name}\``).join(", ")}`;
        }
      let embed = new Discord.MessageEmbed()
      .setColor(Guild.color)
      .setDescription(`${list("setting", "Setting")}\n${list("economy", "Economy")}\n${list("info", "Info")}\n${list("infoBot", "InfoBot")}\n${list("moder", "Moder")}\n${list("music", "Music")}\n${list("NTFS", "18+")}\n${list("fun", "Fun")}`)
      .setFooter(`Всего комманд: ${Main.commands.size} | Благодарность nyansterowo#7191 за гайд :3`)
      .addField(`**<:owner1:703447088603594822> Разработчики:**`,`**${config.owner.map(x => Main.users.cache.get(x).tag).join('\n')}**`)
        message.channel.send(embed)
    }
};
