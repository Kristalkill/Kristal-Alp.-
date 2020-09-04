const {ShardingManager} = require('discord.js');
const manager = new ShardingManager('./src/index.js', { token: process.env.token,autoSpawn: true});
manager.on('shardCreate', shard => console.log(`[Shard Loading]: Шард по айди: #${shard.id} запускается...`));
manager.on("shardDisconnect", shard => console.log(`[Shard Loading]: Шард по айди: #${shard.id} отключился!`));
manager.on("shardReconnecting", shard => console.log(`[Shard Loading]: Шард по айди: #${shard.id} перезапускается...`));
manager.on("shardResume", shard => console.log(`[Shard Loading]: Шард по айди: #${shard.id} успешно переподключился!`));
manager.spawn(2);