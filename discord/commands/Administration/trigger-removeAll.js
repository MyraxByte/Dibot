exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let fc = await Dibot.classes.guilds.removeAllTriggers(message.guild.id)
  if (!fc) return message.channel.send(`No server triggers`)
  message.channel.send(`${fc.msg}`)
}

exports.help = {
    name: 'trigger-removeAll',
    description: 'Remove all triggers',
    usage: [ 'trigger-removeAll' ],
    aliases: [ 'trigger-removeAll', 'delAlltriggers', 'triggerAll-' ]
}

exports.config = {
    guildOnly: true
}
