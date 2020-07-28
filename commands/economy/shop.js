const ErrEmbed = require("../../embeds/ErrEmbed");
module.exports = {
    name: 'shop',
    description: 'shop',
    PermissionBOT:["MANAGE_ROLES"],
    aliases: [],
    public: true,
    async execute(Main, message, args) {
Guild.findOne({guildID: message.guild.id},async(err,res) => {
    const shop = res.Economy.shop
    const role = (message.mentions.roles.first() || message.guild.roles.cache.get(args[2]));
    if(parseInt(args[2]) > 0){
        if(!shop.hasOwnProperty(role.id)){
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
        res.save()
})
    }
}