exports.run = async (client, message, args) => {

  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let parameterList = [
    'add',
    'remove'
  ]

  let parameter = args[0]
  let subcommand = parameterList.find((p) => p == parameter)


  if (!subcommand) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}member-logs\` \`Add or Remove\``)

  switch (subcommand) {
    case 'add':
      let addChannel = await message.channel.id
      let guild = await Dibot.classes.guilds.setMemberLogs(message.guild.id, addChannel)
      message.channel.send(`${guild.msg} to ${message.channel}`)
      break

    case 'remove':
      Dibot.classes.guilds.setMemberLogs(message.guild.id, null)
      message.channel.send(`Join and Leave Member logs removed from ${message.channel}`)
      break
  }
}

exports.help = {
    name: 'member-logs',
    description: 'Add or Remove Join and Leave member logs',
    usage: [ 'member-logs' ],
    aliases: [ 'member-logs', 'join-logs', 'leave-logs' ]
}

exports.config = {
    guildOnly: true
}
