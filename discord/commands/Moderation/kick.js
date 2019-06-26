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
