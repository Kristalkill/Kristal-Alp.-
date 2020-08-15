const mongoose = require("mongoose");
const blockShema = mongoose.Schema({
    id: String,
    reason: String,
});
module.exports = mongoose.model("block", blockShema)
