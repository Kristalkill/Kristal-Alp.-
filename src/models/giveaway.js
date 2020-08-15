const mongoose = require("mongoose");
const giveawayShema = mongoose.Schema({
guildID:String,
time:String,
prize:String,
winners:String,
messageID:String,
channel:String,
users:Array
});
module.exports = mongoose.model("giveaway", giveawayShema)