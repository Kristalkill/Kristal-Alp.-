module.exports = {
    name: "clear",
    description: "clear",
    Permission:["BAN_MEMBERS"],
    PermissionBOT:[],
    aliases: [],
    public: true,
    async execute(Main, message, args,res) {
const amount = args[0];
if (isNaN(amount)||1 < amount > 100)return  message.channel.send(ErrEmbed.setDescription(`Введите число от 1 до 100`))
await message.channel.messages.fetch({ limit: amount }).then(messages => {
    message.channel.bulkDelete(messages)}).then(messages1 =>  message.channel.send(OKEmbed.setDescription(`Удалено ${messages1.size} messages`)))
    }
}