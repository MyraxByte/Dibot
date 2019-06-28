exports.run = async (client, message, args) => {
  let author = message.member
  let database = await Dibot.classes.guilds.getByID(message.guild.id)
  let triggers = database.triggers.map(trig => `**${trig.trigger}** : \`${trig.response}\``)

  if (triggers.length == 0) return message.channel.send(`Trigger list is empty`)
  let embed = new Dibot.embed()
    .setTitle(`Trigger list for "${message.guild.name}"`)
    .setColor(0x678BB7)
    .setDescription(triggers)
  message.channel.send(embed)
}

exports.help = {
    name: 'trigger-list',
    description: 'Trigger list',
    usage: [ 'trigger-list' ],
    aliases: [ 'trigger-list', 'triggerlist', 'tlist' ]
}

exports.config = {
    guildOnly: true
}
