const ErrEmbed = require("../../embeds/ErrEmbed");
module.exports = {
    name: 'shop',
    description: 'shop',
    PermissionBOT:["MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},async(err,res) => {
User.findOne({guildID:message.guild.id, userID:message.author.id},async(err,Data) => {
shop = res.Economy.shop
role = (message.mentions.roles.first() || message.guild.roles.cache.get(args[2]));
var addrole = [role.id,role.name,parseInt(args[3])]
switch(true){
case args[1] == `add` && message.author.hasPermission("ADMINISTRATOR"):
if(parseInt(args[3]) > 0){
Object.assign(shop,addrole)
}else{
message.channel.send(ErrEmbed.setDescription(`Минимальная цена 1$`))
}
break;
case args[1] == `delete` && message.author.hasPermission("ADMINISTRATOR"):
res.Economy.shop.getElementById(role.id).delete()
break;
case shop.entries(element => {elemend.id == args[1] && element.cost < Data.money }):
await message.author.roles.add(muterole.id);
break;
default:
}})})}}