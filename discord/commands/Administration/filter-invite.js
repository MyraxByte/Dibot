exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)
  let database = await Dibot.classes.guilds.getByID(message.guild.id)

  if(database.filters.invite == false) {
    Dibot.classes.guilds.toggleInvite(message.guild.id, true)
    message.channel.send(`✔ Invite filter activated for you server!`)
  }

  if(database.filters.invite == true) {
    Dibot.classes.guilds.toggleInvite(message.guild.id, false)
    message.channel.send(`❌ Invite filter deactivated for you server!`)
  }

}

exports.help = {
    name: 'filter-invite',
    description: 'Toggle Invite links',
    usage: [ 'filter-invite' ],
    aliases: [ 'filter-invite', 'invite', 'filterInv' ]
}

exports.config = {
    guildOnly: true
}
