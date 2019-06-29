exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let fw = await Dibot.classes.guilds.removeAllBadWord(message.guild.id)
  if (!fw) return message.channel.send(`No server bad words`)
  message.channel.send(`${fw.msg}`)
}

exports.help = {
    name: 'badword-clear',
    description: 'Clear bad word list',
    usage: [ 'badword-clear' ],
    aliases: [ 'badword-clear']
}

exports.config = {
    guildOnly: true
}
