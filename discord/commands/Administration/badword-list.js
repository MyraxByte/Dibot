exports.run = async (client, message, args) => {
  let author = message.member
  let database = await Dibot.classes.guilds.getByID(message.guild.id)
  let blacklist = database.filteredWords.map(word => `**${word}**`)

  if (blacklist.length == 0) return message.channel.send(`Word BlackList is empty`)
  let embed = new Dibot.embed()
    .setTitle(`Auto Assing Role list for "${message.guild.name}"`)
    .setColor(0x678BB7)
    .setDescription(blacklist.join(', '))
  message.channel.send(embed)

}

exports.help = {
    name: 'badword-list',
    description: 'List blacklisted words for server',
    usage: [ 'badword-list' ],
    aliases: [ 'badword-list', 'badwordlist']
}

exports.config = {
    guildOnly: true
}
