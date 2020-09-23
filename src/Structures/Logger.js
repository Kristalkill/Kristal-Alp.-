module.exports = class Logger {
  constructor(Main) {
    this.Main = Main;
  }
  get id() {
    return this.shard && this.shard.id ? this.shard.id : '?';
  }

  debug(title, message) {
    console.log(
      `[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`
    );
  }

  log(title, message) {
    console.log(
      `[Process ${process.pid}] [Cluster ${this.id}] [${title}] ${message}`
    );
  }

  error(error) {
    console.error(`[Process ${process.pid}] [Cluster ${this.id}] `, error);
  }
};
