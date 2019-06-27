exports.run = async (client, message, args) => {
  let channel = await message.channel.id
  let guild = await Dibot.classes.guilds.setMemberLogs(message.guild.id, channel)

  message.channel.send(`${guild.msg}`)
}

exports.help = {
    name: 'test',
    description: 'Test command',
    usage: [ 'test' ],
    aliases: [ 'test' ]
}

exports.config = {
    guildOnly: false
}
