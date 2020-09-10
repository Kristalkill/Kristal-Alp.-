const { Manager } = require("@lavacord/discord.js");
const fetch = require("node-fetch");
const {host,port,password} = { id: "1", host: "localhost", port: 3000, password: "enderman"}
module.exports = class Music extends Manager{
    async search(track) {
		return await(
			await fetch(`http://${host}:${port}/loadtracks?identifier=${track}`,{ headers: { Authorization: password}})
		).json()
    }
    async decode(track){
        return await(
			await fetch(`http://${host}:${port}/decodetrack?track=${track}`,{ headers: { Authorization: password}})
		).json()
    }
}