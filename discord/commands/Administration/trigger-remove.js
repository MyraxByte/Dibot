exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let trigger = args[0]

  if (!trigger) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}trigger-\` \`trigger\``)

  let fc = await Dibot.classes.guilds.delTrigger(message.guild.id, trigger)
  if (!fc) return message.channel.send(`Trigger \`${trigger}\` not used!`)
  message.channel.send(`${fc.msg}`)
}

exports.help = {
    name: 'trigger-remove',
    description: 'Remove trigger with response',
    usage: [ 'trigger-remove' ],
    aliases: [ 'trigger-remove', 'delTrigger', 'trigger-' ]
}

exports.config = {
    guildOnly: true
}
