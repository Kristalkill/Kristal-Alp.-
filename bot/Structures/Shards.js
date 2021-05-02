const {
  ShardingManager
} = require('discord.js');
const fs = require('fs');
const {
  spawn
} = require('child_process');
const child = spawn('java', ['-jar', 'Lavalink.jar']);
let application = fs.readFileSync('./application.yml', 'utf8');
if (process.env.PORT) {
  application = application.replace('DYNAMICPORT', process.env.PORT);
}
if (process.env.PASS) {
  application = application.replace('youshallnotpass', process.env.PASS);
}
fs.writeFileSync('./application.yml', application);
child.stdout.setEncoding('utf8');
child.stderr.setEncoding('utf8');

child.stdout.on('data', (data) => {
  console.log(data);
});

child.stderr.on('data', (data) => {
  console.error(data);
});

child.on('error', (error) => {
  console.error(error);
});

child.on('close', (code) => {
  console.log(`Lavalink exited with code ${code}`);
});
setTimeout(async () => {
  const manager = new ShardingManager('./bot/index.js', {
    token: process.env.token,
    autoSpawn: true,
  });
  manager.on('shardCreate', (shard) =>
    console.log(`[Shard Loading]: Шард по айди: #${shard.id} запускается...`)
  );
  await manager.spawn(1)
}, 15000);