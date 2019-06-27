exports.run = async (client, message, args) => {

  let author = message.member
  if (!author.hasPermission('ADMINISTRATOR ')) return message.reply(`Sorry, you need "ADMINISTRATOR " permission.`)

  let ban_list = await message.guild.fetchBans()
  if (ban_list.map().length === 0) return message.channel.send(`Ban list is empty`)
  ban_list.forEach((b) => { message.guild.unban(b) })
  message.channel.send(`All bans on the server removed!`)

}

exports.help = {
    name: 'unban-all',
    description: 'Unban all banned users',
    usage: [ 'unban-all' ],
    aliases: [ 'unban-all', 'allUnban' ]
}

exports.config = {
    guildOnly: true
}
