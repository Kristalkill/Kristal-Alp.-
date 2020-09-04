const {ShardingManager} = require('discord.js');
const manager = new ShardingManager('./src/index.js', { token: process.env.token,  totalShards: 'auto',autoSpawn: true});
manager.on('shardCreate', shard => console.log(`[Shard Loading]: Шард по айди: #${shard.id} запускается...`));
manager.spawn();