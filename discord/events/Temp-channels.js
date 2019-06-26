module.exports = client => {
	 client.on('voiceStateUpdate', async (oldMember, newMember) => {
	 	if (!oldMember.guild) return
    	if (newMember.voiceChannel === oldMember.voiceChannel) return

    	Dibot.guildDB = await Dibot.classes.guilds.getByID(newMember.guild.id)

    	if (Dibot.guildDB.temp_channel && Dibot.guildDB.temp_category !== null) {
    		if (newMember.voiceChannelID === Dibot.guildDB.temp_channel) {
		        let newChan = newMember.guild.channels.find((c)=> c.name == `Channel: ${newMember.user.username}`)
		        if (!newChan) {
		            newMember.guild.createChannel(`Channel: ${newMember.user.username}`, { 
		                type: 'voice', 
		                parent: Dibot.guildDB.temp_category,
		                permissionOverwrites: [
		                {   id: newMember.guild.defaultRole.id,
		                    allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'USE_VAD']},
		                {   id: newMember.user.id,
		                    allow: ['MANAGE_CHANNELS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'MANAGE_ROLES' ] }
		                    ]
		                }).then(
		                   (channel) => {
		                    newMember.voiceChannel.members.forEach(user => user.setVoiceChannel(channel.id))
		                }
		            )
		        } else {
		            newMember.voiceChannel.members.forEach(user => user.setVoiceChannel(newChan.id))
		        }
		    }
    
		    if (oldMember.voiceChannel) {
		        if (oldMember.voiceChannel.parentID === Dibot.guildDB.temp_category) {
		        	if (oldMember.voiceChannelID ===  Dibot.guildDB.temp_channel) return
		            const legthChannel = oldMember.voiceChannel.members.keyArray().length
			        if (legthChannel === 0) {
			            oldMember.voiceChannel.delete()
			        }
		        }
		    }
    	}
	})
}