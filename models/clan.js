const clanShema = mongoose.Schema({
    ownerid: String,
    claname: String,
    description: String,
    messages: String,
    xp: String,
    level:{type:String,default:1},
    money: String,
    members: String
});
module.exports = mongoose.model("clan", clanShema)
