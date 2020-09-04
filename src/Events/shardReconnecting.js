const Event = require('../Structures/Event');
module.exports = class extends Event {
    run(shard){
        console.log(`[Shard Loading]: Шард по айди: #${shard} перезапускается...`)
    }
}