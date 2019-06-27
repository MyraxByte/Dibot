exports.run = async (client, message, args) => {

  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let parameterList = [
    'add',
    'remove'
  ]

  let parameter = args[0]
  let subcommand = parameterList.find((p) => p == parameter)


  if (!subcommand) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}role-logs\` \`Add or Remove\``)

  switch (subcommand) {
    case 'add':
      let addChannel = await message.channel.id
      let guild = await Dibot.classes.guilds.setRoleLogs(message.guild.id, addChannel)
      message.channel.send(`${guild.msg} to ${message.channel}`)
      break

    case 'remove':
      Dibot.classes.guilds.setRoleLogs(message.guild.id, null)
      message.channel.send(`Role logs removed from ${message.channel}`)
      break
  }
}

exports.help = {
    name: 'role-logs',
    description: 'Add or Remove roles logs',
    usage: [ 'role-logs' ],
    aliases: [ 'role-logs' ]
}

exports.config = {
    guildOnly: true
}
