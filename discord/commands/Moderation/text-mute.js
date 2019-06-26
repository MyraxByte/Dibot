exports.run = async (client, message, args) => {

	let author = message.member
    let users = await message.mentions.users

    if (!author.hasPermission('MUTE_MEMBERS')) return message.reply(`Sorry, you need "MUTE_MEMBERS" permission.`)
    if (!users) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}t-mute\` \`@user\``)

    let allusers = []
	users.forEach(user => {
    	let member = message.guild.member(user)

    	let textChannels = message.guild.channels.filter(c => c.type === 'text')
    	textChannels.forEach(async (channel, id) => {
    		await channel.overwritePermissions(member, {
				SEND_MESSAGES: false,
				ADD_REACTIONS: false
			})
    	})
    	allusers.push(member)
    })

    if (allusers.length === 0) return message.channel.send('You can not mute text channels for them.')
	message.channel.send(`**Text Channels Muted for ${allusers}**`)
}

exports.help = {
    name: 'text-mute',
    description: 'Mute member for all text channels',
    usage: [ 'text-mute' ],
    aliases: [ 'text-mute', 't-mute', 'mute' ]
}

exports.config = {
    guildOnly: true
}
