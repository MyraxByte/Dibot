exports.run = async (client, message, args) => {

    let author = message.member
    let value = args[0]

    if (!author.hasPermission('MANAGE_CHANNELS')) return message.reply(`Sorry, you need "MANAGE_CHANNELS" permission.`)
    if (!value) return message.channel.send(`**Error**! Use: \`${Dibot.guildDB.prefix}t-chan\` \`create\` or \`remove\``)

    switch (value) {
        case 'create':

            let tempCategoryName = 'Temporary Channels'
            let tempChannelName = '➕Create Channel'



            let TempCategoryFind = message.guild.channels.find((c)=> c.name == tempCategoryName)
            if (!TempCategoryFind) {

                let temp_category = await message.guild.createChannel(tempCategoryName, { type: 'category'})
                await message.guild.createChannel(tempChannelName, {
                        type: 'voice',
                        parent: temp_category.id })

            } else return message.channel.send('You already have temporary channels.')

            let TempCategory = message.guild.channels.find((c)=> c.name == tempCategoryName)
            let TempChannel = message.guild.channels.find((c)=> c.name == tempChannelName)
            if (TempChannel) {
                let guild = await Dibot.classes.guilds.setTempChan(message.guild.id, TempChannel.id, TempCategory.id)
                message.channel.send(`${guild.msg}`)
            }

            break

        case 'remove':

            let category = message.guild.channels.find((c)=> c.id == Dibot.guildDB.temp_category)
            let channel = message.guild.channels.find((c)=> c.id == Dibot.guildDB.temp_channel)

            if (category == null) {
                message.channel.send(`I can't found Temporary Category`)
            } else {
                category.delete()
            }

            if (channel == null) {
                message.channel.send(`I can't found Temporary Channels`)
            } else {
                channel.delete()
            }

            let guild = await Dibot.classes.guilds.setTempChan(message.guild.id, null, null)
            message.channel.send(`Temporary's Removed`)
            break
          default:
          message.reply(`**Error**! Use: \`${Dibot.guildDB.prefix}t-chan\` \`Create or Remove\``)
          break
    }


}

exports.help = {
    name: 'temp-channels',
    description: 'Create or Remove temp channels to server',
    usage: [ 'temp-channels' ],
    aliases: [ 'tmp-chan', 't-chan', 'temp-channels' ]
}

exports.config = {
    guildOnly: true
}
