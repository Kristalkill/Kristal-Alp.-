const {MessageEmbed} = require ('discord.js');
const space = "\u200b"

module.exports = class Embed extends MessageEmbed {


    chunk(title,content){
        if(content.length < 1024){
        this.fields.push({name:title,value:content,inline:false})
        }else if (1024 < content.length  && content.length < 2048) 
        {
        this.description = content;
        }else if(content.length > 2048){
            this.fields.push({name : title,value:content.slice(0,content.length - 1024),inline:false})
            content = content.slice(1024)
            content.chunk(1024).forEach(element => {
            this.fields.push({name:space,value:element,inline:false})
        });
        }
        return this;
    }
}