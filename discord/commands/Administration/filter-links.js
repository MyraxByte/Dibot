exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)
  let database = await Dibot.classes.guilds.getByID(message.guild.id)

  if(database.filters.links == false) {
    Dibot.classes.guilds.toggleLinks(message.guild.id, true)
    message.channel.send(`✔ Links filter activated for you server!`)
  }

  if(database.filters.links == true) {
    Dibot.classes.guilds.toggleLinks(message.guild.id, false)
    message.channel.send(`❌ Links filter deactivated for you server!`)
  }

}

exports.help = {
    name: 'filter-links',
    description: 'Toggle links filter',
    usage: [ 'filter-links' ],
    aliases: [ 'filter-links', 'flinks', 'filterlink' ]
}

exports.config = {
    guildOnly: true
}
