exports.run = async (client, message, args) => {
  let author = message.member
  let database = await Dibot.classes.guilds.getByID(message.guild.id)
  let aRoles = database.autoRoles.map(role => `**<@&${role}>**`)

  if (aRoles.length == 0) return message.channel.send(`Auto Assing Roles List is empty`)
  let embed = new Dibot.embed()
    .setTitle(`Auto Assing Role list for "${message.guild.name}"`)
    .setColor(0x678BB7)
    .setDescription(aRoles)
  message.channel.send(embed)

}

exports.help = {
    name: 'aarole-list',
    description: 'List auto assign roles',
    usage: [ 'aarole-list' ],
    aliases: [ 'aarole-list', 'autorolelist']
}

exports.config = {
    guildOnly: true
}
