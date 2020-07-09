const blockShema = mongoose.Schema({
    id: Number,
    reason: String,
    time:Number
});
module.exports = mongoose.model("block", blockShema)
