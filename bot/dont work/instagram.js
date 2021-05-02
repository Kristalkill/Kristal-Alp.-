const Command = require('../Structures/Construction/Command');
const axios = require("axios");
const {MessageEmbed} = require("discord.js");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }

    async run(message, [user]) {
        if (!user) {
            return message.channel.send(`Please Enter a Channel Name`)
        }
        let url = user
        if (!url.match(/instagram\.com\/[^/]*/)) {
            url = `https://www.instagram.com/${url}`;
        }
        url += '/?__a=1';
        console.log(url)
        let details = await axios.get(url)
        console.log(details)
        message.channel.send(new MessageEmbed()
            .setTitle(`${details.is_verified ? `${details.username} <a:verified:727820439497211994>` : ` ${details.username}`} ${details.is_private ? '🔒' : ''} `)
            .setDescription(details.biography)
            .setThumbnail(details.profile_pic_url)
            .addFields(
                {
                    name: "Total Posts:",
                    value: details.edge_owner_to_timeline_media.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Followers:",
                    value: details.edge_followed_by.count.toLocaleString(),
                    inline: true
                },
                {
                    name: "Following:",
                    value: details.edge_follow.count.toLocaleString(),
                    inline: true
                }
            ))
    }
}