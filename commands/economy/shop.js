const ErrEmbed = require("../../embeds/ErrEmbed");
module.exports = {
    name: 'shop',
    description: 'shop',
    PermissionBOT:["MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},async(err,res) => {
    const role = (message.mentions.roles.first() || message.guild.roles.cache.get(args[0]));
    if(parseInt(args[1]) > 0){
        if(Object.getOwnPropertyNames(res.Economy.shop).includes(role.id)){
            message.channel.send(`Роль уже есть в магазине`)
        }else{
            res.Economy.shop[role.id] = {
            price:parseInt(args[2])
            }
            message.channel.send('Роль успешно добавлена в магазин')
        }
        }else{
        message.channel.send(ErrEmbed.setDescription(`Минимальная цена 1$`))
        }
        res.save()
})
    }
}