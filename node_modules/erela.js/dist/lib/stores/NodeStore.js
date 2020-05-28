"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = __importDefault(require("../utils/Store"));
/**
 * The NodeStore class.
 */
class NodeStore extends Store_1.default {
    /**
     * Creates an instance of NodeStore.
     * @param {ErelaClient} erela - The ErelaClient.
     * @param {Array<INodeOptions>} nodes - The INodeOptions array.
     */
    constructor(erela) {
        super();
        this.erela = erela;
    }
    /**
     * Filters the connected nodes and sorts them by the amount of rest calls it has made.
     */
    get leastUsed() {
        return this.filter((node) => node.connected).sort((a, b) => b.calls - a.calls);
    }
    /**
     * Filters the connected nodes and sorts them by the least resource usage.
     */
    get leastLoad() {
        return this.filter((node) => node.connected).sort((a, b) => {
            const aload = a.stats.cpu ? a.stats.cpu.systemLoad / a.stats.cpu.cores * 100 : 0;
            const bload = b.stats.cpu ? b.stats.cpu.systemLoad / b.stats.cpu.cores * 100 : 0;
            return aload - bload;
        });
    }
    /**
     * Adds a new Node.
     * @param {INodeOptions} node - The node options.
     * @param {object} [extra={}] - The nodes extra data to pass when extending for custom classes.
     */
    spawn(options, extra = {}) {
        if (this.has(options.identifer || options.host)) {
            throw new Error(`NodeStore#spawn() Node with identifier "${options.identifer || options.host}" already exists.`);
        }
        const node = new this.erela.node(this.erela, options, extra);
        this.set(options.identifer || options.host, node);
        this.erela.emit("nodeCreate", node);
    }
    /**
     * Removes a new Node.
     * @param {any} nodeId - The node ID.
     * @returns {(INode|null)} - The node that was removed, or null if it does not exist.
     */
    remove(nodeId) {
        const node = this.get(nodeId);
        if (!node) {
            return null;
        }
        this.erela.emit("nodeDestroy", node);
        node.destroy();
        this.delete(nodeId);
        return node;
    }
}
exports.default = NodeStore;
