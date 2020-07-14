module.exports = {
    name: "clear",
    description: "clear",
    Permission:["BAN_MEMBERS"],
    PermissionBOT:[],
    aliases: [],
    public: true,
    async execute(Main, message, args,res) {
const amount = arg[0];

if (!amount) return message.reply('You haven\'t given an amount of messages which should be deleted!'); 
if (isNaN(amount)) return message.reply('The amount parameter isn`t a number!'); // Checks if the `amount` parameter is a number. If not, the command throws an error
if (amount > 100) return message.reply('You can`t delete more than 100 messages at once!'); // Checks if the `amount` integer is bigger than 100
if (amount < 1) return message.reply('You have to delete at least 1 message!'); // Checks if the `amount` integer is smaller than 1

await msg.channel.messages.fetch({ limit: amount }).then(messages => { // Fetches the messages
    msg.channel.bulkDelete(messages // Bulk deletes all messages that have been fetched and are not older than 14 days (due to the Discord API)
)});
    }
}