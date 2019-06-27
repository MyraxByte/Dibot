exports.run = async (client, message, args) => {

    let author = message.member
    let reaction_channel = await message.mentions.channels.first()
    let reaction_message = args[1]
    let reaction_emoji = args[2]
    let reaction_role = await message.mentions.roles.first()
    // Check author permissions
    if (!author.hasPermission('MANAGE_ROLES')) return message.reply(`Sorry, you need "MANAGE_ROLES" permission.`)

    // Check inputs
    if (!reaction_channel || !reaction_message || !reaction_emoji || !reaction_role) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}rearole-add\` \`#channel-name\` \`message_id\` \`:emoji_name:\` \`@role\``)

    // Fetch Message and Valid from @reaction_message
    let validMessage = await reaction_channel.fetchMessage(reaction_message).catch((err) => { if(err) return null})
    if(!validMessage) return message.reply(`Sorry but \`${reaction_message}\` message not found`)

    // Fetch emoji and Valid from @reaction_emoji
    let reacted = await validMessage.react(reaction_emoji).catch((err) => { if(err) return null})
    if (!reacted) return message.reply(`Sorry but emoji \`${reaction_emoji}\` not found`)

    let guild = await Dibot.classes.guilds.addReactionRole(message.guild.id, reaction_channel.id, reaction_message, reaction_emoji, reaction_role.id)
    message.channel.send(`${guild.msg}`)
      .then((m) => m.delete(3000))
    message.delete(3000)

}

exports.help = {
    name: 'rearole-add',
    description: 'Add reaction role for specific message',
    usage: [ 'rearole-add' ],
    aliases: [ 'rearole-add', 'rr-add' ]
}

exports.config = {
    guildOnly: true
}
