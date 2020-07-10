module.exports = (Main,guild) => {
let nguild = new Guild({guildID: guild.id,ownerID:guild.owner.user.id})
  nguild.save()
}