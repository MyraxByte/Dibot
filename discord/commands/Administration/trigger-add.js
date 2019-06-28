exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let trigger = args[0]
  let response = args.slice(1).join(' ')

  if (!trigger || !response) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}trigger+\` \`trigger\` \`response\``)

  let fc = await Dibot.classes.guilds.addTrigger(message.guild.id, trigger, response)
  if (!fc) return message.channel.send(`Trigger \`${trigger}\` already used!`)
  message.channel.send(`${fc.msg}`)
}

exports.help = {
    name: 'trigger-add',
    description: 'Add trigger with response',
    usage: [ 'trigger-add' ],
    aliases: [ 'trigger-add', 'addTrigger', 'trigger+' ]
}

exports.config = {
    guildOnly: true
}
