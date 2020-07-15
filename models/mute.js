const muteShema = mongoose.Schema({
    id: Number,
    guildid:Number,
    reason: String,
    time:Number
});
module.exports = mongoose.model("mute", muteShema)