const { Manager } = require("@lavacord/discord.js");
const {host,port,password} = { id: "1", host: "localhost", port: process.env.PORT, password: "enderman"}
const fetch = require('node-fetch')
class Music extends Manager{
    constructor(Main){
        super({Main,nodes})
        this.Main = Main
    }
    static async search(track) {
		return await(
			await fetch(`http://${host}:${port}/loadtracks?identifier=${track}`,{ headers: { Authorization: password}})
		).json()
    }
    static async decode(track){
        return await(
			await fetch(`http://${host}:${port}/decodetracks?track=${track}`,{ headers: { Authorization: password}})
		).json()
    }

}