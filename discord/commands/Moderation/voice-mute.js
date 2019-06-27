exports.run = async (client, message, args) => {

		let author = message.member
    let users = await message.mentions.users

    if (!author.hasPermission('DEAFEN_MEMBERS')) return message.reply(`Sorry, you need "DEAFEN_MEMBERS" permission.`)
    if (!users) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}v-mute\` \`@user\``)

    let allusers = []
		users.forEach(user => {
	    	let member = message.guild.member(user)

	    	let textChannels = message.guild.channels.filter(c => c.type === 'voice')
	    	textChannels.forEach(async (channel, id) => {
	    		await channel.overwritePermissions(member, {
					SPEAK: false,
					USE_VAD: false
				})
	    	})

	        if (!member.voiceChannel === 'undefined') {
	            member.setDeaf(false)
	            member.setMute(false)
	        }

	    	allusers.push(member)
	  })

    if (allusers.length === 0) return message.channel.send('You can not mute voice channels for them.')
		message.channel.send(`**Voice Channels Muted for ${allusers}**`)


		// Moderation logs
		// Load Database
		Dibot.guildDB = await Dibot.classes.guilds.getByID(message.guild.id)
		// Check log channel in database
		let logChannel = message.guild.channels.get(Dibot.guildDB.logs.moderation)
		if (!logChannel) return
		const embed = new Dibot.embed()
				.setColor(0xD5883C)
				.setDescription(`${author} given voice mute for **${allusers}**`)
		logChannel.send(embed)
}

exports.help = {
    name: 'voice-mute',
    description: 'Mute member for all voice channels',
    usage: [ 'voice-mute' ],
    aliases: [ 'voice-mute', 'v-mute', 'deafen' ]
}

exports.config = {
    guildOnly: true
}
