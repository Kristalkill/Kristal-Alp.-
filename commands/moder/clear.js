module.exports = {
    name: "clear",
    description: "clear",
    Permission:["BAN_MEMBERS"],
    PermissionBOT:[],
    aliases: [],
    public: true,
    async execute(Main, message, args,res) {
const amount = args[0];
if (isNaN(amount)||1 < amount > 100)return message.reply(ErrEmbed.setDescription(`Введите число от 1 до 100`))
    message.channel.bulkDelete(amount).then(messages => message.reply(OKEmbed.setDescription(`Удалено ${messages.size} messages`)))
    }
}