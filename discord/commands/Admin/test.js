exports.run = async (client, message, args) => {
    message.channel.reply('Тестовая команда!')
}

exports.help = {
    name: 'test',
    description: 'Test command',
    usage: [ 'test' ],
    aliases: [ '' ]
}

exports.config = {
    guildOnly: false
}
