module.exports = message => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(false)

      let database = await Dibot.classes.guilds.getByID(message.guild.id)
      let filter = database.filters.links
      if (filter == false) return
      if (message.member.hasPermission('MANAGE_GUILD')) return

      // TODO: Whitelist for users and channels
      let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi)
      if (!links) return

      resolve(true)
      if (message.deletable) message.delete().catch(() => {})
      let embed = new Dibot.embed()
        .setColor(0xF78C6A)
        .setDescription(`${message.author} you are not allowed to post links here.`)
      message.channel.send(embed)
      .then(msg => { msg.delete(5000).catch(() => {}) })
      .catch(e => { message.client.log.error(e) })
    }
    catch (e) {
      reject(e)
    }
  })
}
