const {
  Shoukaku
} = require('shoukaku');
const Queue = require('./Queue.js');
const nodes = [{
  name: '1',
  host: 'localhost',
  port: 3000,
  auth: 'enderman',
}]
module.exports = class Music extends Shoukaku {
  constructor(Main) {
    super(
      Main,
      nodes, {
        moveOnDisconnect: false,
        resumable: 'resumableKongou',
        resumableTimeout: 30,
        reconnectTries: 2,
        restTimeout: 10000,
      }
    );
    this.queue = new Queue(Main);
    this.on('ready', (name, resumed) =>
      Main.logger.log(
        `Lavalink Node: ${name} is now connected`,
        `This connection is ${resumed ? 'resumed' : 'a new connection'}`
      )
    );
    this.on('error', (name, error) => Main.logger.error(error));
    this.on('close', (name, code, reason) =>
      Main.logger.log(
        `Lavalink Node: ${name} closed with code ${code}`,
        reason || 'No reason'
      )
    );
    this.on('disconnected', (name, reason) =>
      Main.logger.log(
        `Lavalink Node: ${name} disconnected`,
        reason || 'No reason'
      )
    );
  }
};