const ErrEmbed = require("../../embeds/ErrEmbed");
module.exports = {
    name: 'shop',
    description: 'shop',
    PermissionBOT:["MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},async(err,res) => {
User.findOne({guildID:member.guild.id, userID:member.id},async(err,Data) => {
shop = res.Economy.shop
role = message.guild.roles(args[2]||message.mentions.roles.first())
var role = {
    name:role.name,
    id:role.id,
    cost:parseInt(args[3])
}
switch(true){
case args[1] == `add` && message.author.hasPermission("ADMINISTRATOR"):
if(parseInt(args[3]) > 0){
Object.assign(shop,role)
}else{
message.channel.send(ErrEmbed.setDescription(`Минимальная цена 1$`))
}
break;
case args[1] == `delete` && message.author.hasPermission("ADMINISTRATOR"):
res.Economy.shop.getElementById(role.id).delete()
break;
case shop.forEach(element => {elemend.id == args[1] && element.cost < Data.money }):
await message.author.roles.add(muterole.id);
break;
default:
}})})}}