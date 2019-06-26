exports.run = async (client, message, args) => {

	let author = message.member
    let role = await message.mentions.roles.first()
    let users = await message.mentions.users


    if (!author.hasPermission('MANAGE_ROLES')) return message.reply(`Sorry, you need "MANAGE_ROLES" permission.`)
    if (!role) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}role+\` \`@role\` \`@user\``)
    if (!users) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}role+\` \`@role\` \`@user\``)

    let allusers = []
    users.forEach(user => {
    	let member = message.guild.member(user)
    	if (member.roles.has(role.id)) return
    	allusers.push(member)
    	member.addRole(role.id)
    })
    if (allusers.length === 0) return message.channel.send('Users already have this role.')
	message.channel.send(`Role ${role} added for: ${allusers}`)
}

exports.help = {
    name: 'role-add',
    description: 'Add role for members',
    usage: [ 'role-add' ],
    aliases: [ 'addrole', 'role-add', 'role+' ]
}

exports.config = {
    guildOnly: true
}


