module.exports = message => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(false)

      let database = await Dibot.classes.guilds.getByID(message.guild.id)
      let filter = database.filters.words
      if (filter == false) return
      if (message.member.hasPermission('MANAGE_GUILD')) return;

      // TODO: Whitelist for users and channels

      // If message contains a blacklisted word, filter it
      let filteredWords = database.filteredWords

      console.log(filteredWords)
      for (let word of filteredWords) {
        if (message.content.toLowerCase().split(' ').includes(word.toLowerCase())) {
          resolve(true)

          if (message.deletable) message.delete().catch(() => {})
          let embed = new Dibot.embed()
            .setColor(0xF78C6A)
            .setDescription(`Sorry! ${message.author} you are not supposed to use that word in here!`)
          message.channel.send(embed)
            .then(msg => { msg.delete(10000).catch(() => {}) })
            .catch(() => {})
          return resolve(true)
        }
      }
    }
    catch (e) {
      reject(e)
    }
  })
}
