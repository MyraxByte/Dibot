exports.run = async (client, message, args) => {
    message.channel.send('test')
}

exports.help = {
    name: 'test',
    description: 'Test command',
    usage: [ 'test' ],
    aliases: [ 'test' ]
}

exports.config = {
    guildOnly: false
}