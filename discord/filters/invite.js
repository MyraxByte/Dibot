const wapi = require('bwapi');
const BWAPI = new wapi({
  headers: {
    'User-Agent': 'Dibot for Discord Hack Week'
  }
})

module.exports = async message => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(false)

      let database = await Dibot.classes.guilds.getByID(message.guild.id)
      let filter = database.filters.invite
      if (filter == false) return
      if (message.member.hasPermission('MANAGE_GUILD')) return

      // TODO: Whitelist for users and channels

      // If message contains a discord invite, filter it
      if (hasDiscordInvite(message.content)) {
        resolve(true)
        return deleteInvite(message)
      }

      let links = message.content.match(/(http[s]?:\/\/)(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/gi)
      if (!links) return

      for (let url of links) {
        let { followedURL } = awaitBWAPI.request('/url/follow', {
          qs: {
            url: url
          }
        })

        if (hasDiscordInvite(followedURL)) {
          resolve(true);
          return deleteInvite(message)
        }
      }
    }
    catch (e) {
      reject(e)
    }
  })
}


function hasDiscordInvite(string) {
  let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i

  if (discordInvite.test(string)) return true
  return false
}


function deleteInvite(message) {
  if (message.deletable) {
    message.delete().catch(() => {})
  }

  message.channel.send({
    embed: {
      color: 0xF78C6A,
      description: `${message.author} you are not allowed to post server invite links here.`
    }
  }).then(msg => {
    msg.delete(5000).catch(() => {})
  }).catch(e => {
    message.client.log.error(e)
  })
  return true
}
