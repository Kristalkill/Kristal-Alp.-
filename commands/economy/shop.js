const ErrEmbed = require("../../embeds/ErrEmbed");
module.exports = {
    name: 'shop',
    description: 'shop',
    PermissionBOT:["MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},(err,res) => {
const role = (message.mentions.roles.first() || message.guild.roles.cache.get(args[1]));
if(message.member.hasPermission("ADMINISTRATOR")){
if(role){
if(args[0] == 'add'){
        if(parseInt(args[2]) > 0){
            if(Object.getOwnPropertyNames(res.Economy.shop).includes(role.id)){
                message.channel.send(`Роль уже есть в магазине`)
            }else{
               res.Economy.shop[role.id] = parseInt(args[2])
               res.save();
               message.channel.send('Роль успешно добавлена в магазин')
            }
            }else{
            message.channel.send(ErrEmbed.setDescription(`Минимальная цена 1$`))
            }
        }else if(args[0] == 'delete'){
            if(Object.getOwnPropertyNames(res.Economy.shop).includes(role.id)){
            delete res.Economy.shop[role.id];
            res.save();
            message.channel.send('Роль успешно удалена из магазина')
            }else{
                message.channel.send('Роли нету в магазине')
            }
        }
}else{
message.channel.send(ErrEmbed.setDescription(`Укажите роль`))
}
}
})
    }
}