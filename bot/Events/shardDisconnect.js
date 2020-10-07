const Event = require('../Structures/Construction/Event');

module.exports = class extends Event {
  run(shard) {
    console.log(`[Shard Loading]: Шард по айди: #${shard} отключился!`);
  }
};
