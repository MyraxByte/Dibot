exports.run = async (client, message, args) => {
		let author = message.member
    let users = await message.mentions.users


    if (!author.hasPermission('KICK_MEMBERS')) return message.reply(`Sorry, you need "KICK_MEMBERS" permission.`)
    if (!users) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}kick\` \`@user\``)

    let allusers = []
		users.forEach(user => {
	    	let member = message.guild.member(user)
	    	allusers.push(member)
	    	member.kick()
	    })
    if (allusers.length === 0) return message.channel.send('You can not kick this user.')
		message.channel.send(`Kicked: ${allusers}`)

		// Moderation logs
		// Load Database
		Dibot.guildDB = await Dibot.classes.guilds.getByID(message.guild.id)
		// Check log channel in database
		let logChannel = message.guild.channels.get(Dibot.guildDB.logs.moderation)
		if (!logChannel) return
		const audit = await message.guild.fetchAuditLogs({limit: 1})
		const firstEntries = audit.entries.first().executor
		const embed = new Dibot.embed()
				.setColor(0xE87B3D)
				.setDescription(`${firstEntries} kicked **${allusers}** from the server`)
		logChannel.send(embed)
}

exports.help = {
    name: 'kick',
    description: 'Kick user from the server',
    usage: [ 'kick' ],
    aliases: [ 'kick' ]
}

exports.config = {
    guildOnly: true
}
