exports.run = async (client, message, args) => {

		let author = message.member
    let users = await message.mentions.users


    if (!author.hasPermission('BAN_MEMBERS')) return message.reply(`Sorry, you need "BAN_MEMBERS" permission.`)
    if (!users) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}ban\` \`@user\``)

    let allusers = []
		users.forEach(user => {
	    	let member = message.guild.member(user)
	    	if (!member.bannable) return
	    	allusers.push(member)
	    	member.ban({
          reason: `${author.user.username} banned`,
        })
	    })
    if (allusers.length === 0) return message.channel.send('You can not ban this user.')
		message.channel.send(`Banned: ${allusers}`)

		// Moderation logs
		// Load Database
		Dibot.guildDB = await Dibot.classes.guilds.getByID(message.guild.id)
		// Check log channel in database
		let logChannel = message.guild.channels.get(Dibot.guildDB.logs.moderation)
		if (!logChannel) return
		const audit = await message.guild.fetchAuditLogs({limit: 1})
		const firstEntries = audit.entries.first().executor
		const embed = new Dibot.embed()
				.setColor(0xE74C3C)
				.setDescription(`${firstEntries} banned **${allusers}**`)
		logChannel.send(embed)
}

exports.help = {
    name: 'ban',
    description: 'Ban user on server',
    usage: [ 'ban' ],
    aliases: [ 'ban' ]
}

exports.config = {
    guildOnly: true
}
