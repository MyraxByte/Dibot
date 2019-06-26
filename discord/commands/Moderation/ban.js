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
    	member.ban()
    })
    if (allusers.length === 0) return message.channel.send('You can not ban this user.')
	message.channel.send(`Banned: ${allusers}`)
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
