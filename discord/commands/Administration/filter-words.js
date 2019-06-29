exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)
  let database = await Dibot.classes.guilds.getByID(message.guild.id)

  if(database.filters.words == false) {
    Dibot.classes.guilds.toggleWords(message.guild.id, true)
    message.channel.send(`✔ Words filter activated for you server!`)
  }

  if(database.filters.words == true) {
    Dibot.classes.guilds.toggleWords(message.guild.id, false)
    message.channel.send(`❌ Words filter deactivated for you server!`)
  }

}

exports.help = {
    name: 'filter-words',
    description: 'Toggle words filter',
    usage: [ 'filter-words' ],
    aliases: [ 'filter-words', 'fwords', 'filterWord' ]
}

exports.config = {
    guildOnly: true
}
