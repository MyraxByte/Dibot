exports.run = async (client, message, args) => {

  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let parameterList = [
    'add',
    'remove'
  ]

  let parameter = args[0]
  let subcommand = parameterList.find((p) => p == parameter)


  if (!subcommand) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}mod-logs\` \`Add or Remove\``)

  switch (subcommand) {
    case 'add':
      let addChannel = await message.channel.id
      let guild = await Dibot.classes.guilds.setModLogs(message.guild.id, addChannel)
      message.channel.send(`${guild.msg} to ${message.channel}`)
      break

    case 'remove':
      Dibot.classes.guilds.setModLogs(message.guild.id, null)
      message.channel.send(`Moderation logs removed from ${message.channel}`)
      break
  }
}

exports.help = {
    name: 'mod-logs',
    description: 'Add or Remove moderation logs',
    usage: [ 'mod-logs' ],
    aliases: [ 'mod-logs' ]
}

exports.config = {
    guildOnly: true
}
