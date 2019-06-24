module.exports = client => {
    client.on('message', async message => {
        if (message.author.bot) return
        if (!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return
    	
        // Получаем аргументы и команды с сообщений
		const args = message.content.trim().split(/ +/g)
		const command = args.shift().slice(Dibot.config.prefix.length).toLowerCase()
		
		// Если мы не можем найти пользователя = находим
		if (message.guild && !message.member) await message.guild.fetchMember(message.author)
		

		const cmd = Dibot.commands.get(command) || Dibot.commands.get(Dibot.aliases.get(command))
    	if (!cmd) return

    	cmd.run(message, args)
    })
}