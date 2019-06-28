exports.run = async (client, message, args) => {

	let author = message.member
  let user = await message.mentions.users.first()

  if (user) {

    let guild = await Dibot.classes.guilds.getByID(message.guild.id)
    let filter = guild.mutes.filter(m => m.user == user.id && m.mute_type)
    let muteslist = filter.map(m => `<@${m.user}> : **${m.mute_type}**`)

    let embed = new Dibot.embed()
      .setTitle(`"${user.username}" Mute list`)
      .setColor(0xD8D548)
      .setDescription(muteslist)
    message.channel.send(embed)

  } else {

    let guild = await Dibot.classes.guilds.getByID(message.guild.id)
    let muteslist = guild.mutes.map(m => `<@${m.user}> : **${m.mute_type}**`)

    let embed = new Dibot.embed()
      .setTitle(`Mutes list for "${message.guild.name}"`)
      .setColor(0x678BB7)
      .setDescription(muteslist)
    message.channel.send(embed)

  }
}

exports.help = {
    name: 'mutelist',
    description: 'Mute list',
    usage: [ 'mutelist' ],
    aliases: [ 'mutelist', 'm-list', 'mute-list' ]
}

exports.config = {
    guildOnly: true
}
