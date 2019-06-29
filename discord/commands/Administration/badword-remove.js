exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let word = args[0]

  if (!word) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}badword-\` \`word\``)

  let fw = await Dibot.classes.guilds.delBadWord(message.guild.id, word)
  if (!fw) return message.channel.send(`Bad words \`${word}\` not used!`)
  message.channel.send(`${fw.msg}`)
}

exports.help = {
    name: 'badword-remove',
    description: 'Remove bad word to blacklist',
    usage: [ 'badword-remove' ],
    aliases: [ 'badword-remove', 'delBadWord', 'badword-' ]
}

exports.config = {
    guildOnly: true
}
