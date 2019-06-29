exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let word = args[0]

  if (!word) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}badword+\` \`word\``)

  let fw = await Dibot.classes.guilds.addBadWord(message.guild.id, word)
  if (!fw) return message.channel.send(`Bad words \`${word}\` already used!`)
  message.channel.send(`${fw.msg}`)
}

exports.help = {
    name: 'badword-add',
    description: 'Add bad word to blacklist',
    usage: [ 'badword-add' ],
    aliases: [ 'badword-add', 'addBadWord', 'badword+' ]
}

exports.config = {
    guildOnly: true
}
