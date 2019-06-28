module.exports = client => {
    client.on('message', async message => {
        if (message.author.bot) return
        if (!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return
        
        Dibot.guildDB = await Dibot.classes.guilds.getByID(message.guild.id)
        Dibot.userDB = await Dibot.classes.users.getByID(message.author.id)

        let prefix = Dibot.guildDB.prefix
		    const args = message.content.trim().split(/ +/g)
        const command = args.shift().slice(prefix.length).toLowerCase()

        let cmd
        if (message.client.commands.has(command)) {
          cmd = message.client.commands.get(command)
        } else if (message.client.aliases.has(command)) {
          cmd = message.client.commands.get(message.client.aliases.get(command).toLowerCase())
        } else return
        if (cmd) {
          try {
            cmd.run(message.client, message, args)
          } catch (error) {
            console.error(error)
            message.reply('Произошла ошибка при выполнении этой команды')
          }
        }
    })
}
