function managePerms(message, needPerms,member) {
    if(config.owner.includes(member))return;
    let need = [];
      needPerms.push("EMBED_LINKS");
      needPerms.push("ADD_REACTIONS");
      needPerms.push("USE_EXTERNAL_EMOJIS");
    needPerms.map((p) => !message.channel.permissionsFor(member).has(p) ? need.push(p) : null);
    if (need.length) return {
      need,
      embed: message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS") ? true : false
    };
    else return false;
  }