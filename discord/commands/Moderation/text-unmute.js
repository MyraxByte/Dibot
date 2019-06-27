exports.run = async (client, message, args) => {

		let author = message.member
    let users = await message.mentions.users

    if (!author.hasPermission('MUTE_MEMBERS')) return message.reply(`Sorry, you need "MUTE_MEMBERS" permission.`)
    if (!users) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}t-unmute\` \`@user\``)

    let allusers = []
		users.forEach(user => {
	    	let member = message.guild.member(user)

	    	let textChannels = message.guild.channels.filter(c => c.type === 'text')
	    	textChannels.forEach(async (channel, id) => {
	    		await channel.overwritePermissions(member, {
					SEND_MESSAGES: null,
					ADD_REACTIONS: null
				})
	    	})
	    	allusers.push(member)
	  })

    if (allusers.length === 0) return message.channel.send('You can not unmute text channels for them.')
		message.channel.send(`**Text Channels Unmuted for ${allusers}**`)

		// Moderation logs
		// Load Database
		Dibot.guildDB = await Dibot.classes.guilds.getByID(message.guild.id)
		// Check log channel in database
		let logChannel = message.guild.channels.get(Dibot.guildDB.logs.moderation)
		if (!logChannel) return
		const embed = new Dibot.embed()
				.setColor(0x57CE8C)
				.setDescription(`${author} unmuted text chat for **${allusers}**`)
		logChannel.send(embed)
}

exports.help = {
    name: 'text-unmute',
    description: 'Unmute member for all text channels',
    usage: [ 'text-unmute' ],
    aliases: [ 'text-unmute', 't-unmute', 'unmute' ]
}

exports.config = {
    guildOnly: true
}
