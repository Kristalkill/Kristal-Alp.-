module.exports = (Main) => {
console.log(`[✅Bot] ${Main.user.tag} Запущен на ${PORT}!`)
let statuses = [`k!help`, `${Main.guilds.cache.size} серверов`, `${Main.users.cache.size} участников`, `Bot by END`];
let acitvestatus = statuses[Math.floor(Math.random() * statuses.length)];
setInterval(function () {
    Main.user.setPresence({ game: { name: acitvestatus, status: 'online', type: "STREAMING", url: "https://www.youtube.com/channel/UC-r7FefpKluK-rlwaWlQFOw" } });
    Main.user.setPresence({ activity: { name: acitvestatus }, status: 'online' });
}, 15 * 1000);
}