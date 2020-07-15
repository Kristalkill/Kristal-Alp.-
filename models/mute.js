const muteShema = mongoose.Schema({
    id: String,
    guildID:String,
    reason: String,
    time:String,
    role:String,
    channel:String
});
module.exports = mongoose.model("mute", muteShema)