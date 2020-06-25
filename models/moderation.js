const moderation = mongoose.Schema({
    guildID: String,
    mute:Array,
    time:Number,
    reason:String
})
module.exports = mongoose.model("Moderation", moderationshema)
