module.exports = (Main,guild) => {
    try {
        Guild.deleteOne({guildID: guild.id})   
    } catch (error) {
        console.log(error)
    }
}