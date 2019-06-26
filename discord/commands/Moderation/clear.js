exports.run = async (client, message, args) => {

	const value = Math.abs(args[0])
    let messages = await message.channel.fetchMessages({ limit: value && value < 100 ? value : 100 })

    let mss
    if (value) {
        messages = messages.filter(message => message.author.id)
        mss = `♻ Cleared **${value || 100}** messages`
    } else if (args[0] === 'bots') {
        messages = messages.filter(message => message.author.bot)
        mss = `♻ Cleared **${value || 100}** bots messages`
    } else if (args[0] === 'nonpinned') {
        messages = messages.filter(message => !message.pinned);
        mss = `♻ Cleared **${value || 100}** nonpinned messages `
    } else if (!value) {
        mss = `♻ Cleared **100** messages`
    }

    let clearedMessages = await message.channel.bulkDelete(messages, true)
    if (!clearedMessages.size) {
        return message.channel.send('Messages for cleaning not found')
    }

    await message.channel.send(mss)
}

exports.help = {
    name: 'clear',
    description: 'clear messages',
    usage: [ 'clear' ],
    aliases: [ 'clear', 'purge', 'delete' ]
}

exports.config = {
    guildOnly: true
}
