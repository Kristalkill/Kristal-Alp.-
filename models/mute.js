const muteShema = mongoose.Schema({
    id: Number,
    guildid:Number,
    reason: String,
    time:Number,
    role:Number
});
module.exports = mongoose.model("mute", muteShema)