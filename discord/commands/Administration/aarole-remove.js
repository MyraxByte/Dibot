exports.run = async (client, message, args) => {
  let author = message.member
  if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)

  let role = await message.mentions.roles.first()
  if (!role) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}aarole-\` \`@role\``)

  let aRole = await Dibot.classes.guilds.delARole(message.guild.id, role.id)
  if (!aRole) return message.channel.send(`Role ${role} not used!`)
  message.channel.send(`${aRole.msg}`)

}

exports.help = {
    name: 'aarole-',
    description: 'Remove role from auto assign',
    usage: [ 'aarole-' ],
    aliases: [ 'aarole-', 'aarole-remove']
}

exports.config = {
    guildOnly: true
}
