module.exports = (Main,guild) => {
    try {
        if(!guild.me.hasPermission(["ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES","USE_EXTERNAL_EMOJIS"]))return message.guild.owner.send(embeds.ErrEmbed.setDescription(`**К сожелению у бота нету прав:  \`${["ADD_REACTIONS","VIEW_CHANNEL","SEND_MESSAGES","USE_EXTERNAL_EMOJIS"]}\`\nЯ не могу исполнить вашу команду.**`));
        Guild.create({guildID: guild.id,ownerID:guild.ownerid});   
    } catch (error) {
        console.log(error)
    }
}