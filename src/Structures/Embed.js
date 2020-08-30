const {MessageEmbed} = require ('discord.js');
const space = "\u200b"

module.exports = class Embed extends MessageEmbed {


    chunkfields(title,content){
        content.toString()
        if(content.length < 1024){
            this.fields.push({name:title,value:content,inline:true})
        }
        else if (1024 < content.length  && content.length < 2048){
            this.description = content;
        }
        else if(content.length > 2048){
        content.chunk(1024).forEach(element => {
            this.fields.push({name:space,value:element,inline:true})
        });
        }
        return this;
    }
}