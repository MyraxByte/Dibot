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
