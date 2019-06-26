exports.run = async (client, message, args) => {

    let author = message.member
    let newPrefix = args[0]

    if (!newPrefix) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}prefix\` \`you new prefix\``)
    if (!author.hasPermission('MANAGE_GUILD')) return message.reply(`Sorry, you need "MANAGE_GUILD" permission.`)
    let guild = await Dibot.classes.guilds.setPrefix(message.guild.id, newPrefix)

    message.channel.send(`${guild.msg}`)
}

exports.help = {
    name: 'prefix',
    description: 'change prefix for guild',
    usage: [ 'prefix' ],
    aliases: [ 'prefix' ]
}

exports.config = {
    guildOnly: true
}
