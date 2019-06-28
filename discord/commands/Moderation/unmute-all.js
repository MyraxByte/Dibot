exports.run = async (client, message, args) => {
  let author = message.member

  if (!author.hasPermission(['MUTE_MEMBERS', 'DEAFEN_MEMBERS'])) return message.reply(`Sorry, you need "MUTE_MEMBERS" and "DEAFEN_MEMBERS" permissions.`)
  let guild = await Dibot.classes.guilds.getByID(message.guild.id)
  let mutes = guild.mutes.map(m => m.user )
  mutes.forEach(user => {
    let member = message.guild.member(user)
    let textChannels = message.guild.channels
    textChannels.forEach(async (channel, id) => {
      await channel.overwritePermissions(member, {
        SEND_MESSAGES: null,
        ADD_REACTIONS: null
      })
    })
  })
  Dibot.classes.guilds.removeAllMutes(message.guild.id)
  message.channel.send(`All members unmuted!`)
}

exports.help = {
    name: 'allunmute',
    description: 'Unmute all members',
    usage: [ 'allunmute' ],
    aliases: [ 'allunmute', 'unmute-all']
}

exports.config = {
    guildOnly: true
}
