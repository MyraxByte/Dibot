exports.run = async (client, message, args) => {

	let author = message.member
    let user = await message.mentions.users.first()


    if (!author.hasPermission('MANAGE_ROLES')) return message.reply(`Sorry, you need "MANAGE_ROLES" permission.`)
    if (!user) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}Allrole-\` \`@user\``)

    let member_roles = []
    let member = message.guild.members.get(user.id)
    let roles = member.roles

    if (roles.map((m)=> m).length === 1) return message.channel.send(`Member has no roles`)

    roles.forEach((r) => {
      if (r.name == '@everyone') return
      member_roles.push(r)
      member.removeRole(r.id)
    })
    message.channel.send(`All roles removed from ${user}!\n**Roles**: ${member_roles.join(', ')}`)

}

exports.help = {
    name: 'role-removeAll',
    description: 'Remove all roles from member',
    usage: [ 'role-removeAll' ],
    aliases: [ 'role-removeAll', 'removeAllRoles', 'allrole-' ]
}

exports.config = {
    guildOnly: true
}
