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
switch(true){
case args[1] == `add` && message.author.hasPermission("ADMINISTRATOR"):
if(parseInt(args[3]) > 0){
if(shop.hasOwnProperty(role.id)){
    message.channel.send(`Роль уже есть в магазине`)
}else{
shop[role.id] = {
    price:parseInt(args[3])
}
}
message.channel.send('Роль успешно добавлена в магазин')
}else{
message.channel.send(ErrEmbed.setDescription(`Минимальная цена 1$`))
}
break;
case args[1] == `delete` && message.author.hasPermission("ADMINISTRATOR"):
res.Economy.shop.getElementById(role.id).delete()
message.channel.send('Роль успешно удалена из магазина')
break;
default:
}})
res.save()
})}}