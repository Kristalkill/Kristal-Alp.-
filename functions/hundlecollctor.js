module.exports =
function handleCollector(collector, tracks) {
  const tracksToQueue = [];
  return new Promise((resolve, reject) => {
    try {
      collector.on('collect', message => {
        if (message.content.toLowerCase() === 'queueall') {
          collector.stop();
          selections.clear();
          resolve(tracks);
        } else if (message.content.toLowerCase() === 'stopselect') {
          collector.stop();
          selections.clear();
          resolve(tracksToQueue);
        } else {
          const entry = message.content;
          console.log(selections);
          if (selections.has(entry)) {
            message.channel.send('You already selected that song!');
          } else {
            message.channel.send(`You selected: ${tracks[entry-1].title}`);
            tracksToQueue.push(tracks[entry-1]);
            selections.add(entry);
          }
        }
      });
    } catch (err) {
      reject(err);
    }
  })
}
