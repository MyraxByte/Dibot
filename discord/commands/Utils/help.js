exports.run = async (client, message, args) => {

	let cat_list = [
		{'name': 'Moderation', 'icon': '🔨'},
		{'name': 'Administration', 'icon': '⚙'},
		{'name': 'Utils', 'icon': '🔩'}
	]

	let getPage = (mainpage = true, categoryName) => {

		if (mainpage) {

			let description = cat_list.map(cat => `${cat.icon} | **${cat.name}**` ).join(`\n`)
			return new Dibot.embed()
				.setTitle('Help menu: Choose category')
				.setColor(0x5791D1)
				.setDescription(description)
				.setFooter(`🏠 - main | 🛑 - stop`)

		} else {

			let commands = Dibot.commands.filter(c => c.config.category == `${categoryName}`)
			let commandsText = commands.map(cmd => `**\`${Dibot.guildDB.prefix}${cmd.help.name}\`** - ${cmd.help.description}`).join('\n\n');

			return new Dibot.embed()
                    .setTitle(`Help menu: ${categoryName}`)
                    .setDescription(`${commandsText}`)
                    .setFooter(`Use 🏠 for back to main page`)

		}
	}

	let msg = await message.channel.send(getPage())
	let listIcons = cat_list.map(c => c.icon)
	let reactions = ['🏠', ...listIcons, '🛑']

	let filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id == message.author.id
	let collector = await msg.createReactionCollector(filter, {time: 300000})

	collector.on('collect', async reaction => {
            if (reaction.emoji.name == '🛑') return collector.stop()
    
            if (reaction.emoji.name == '🏠') return await msg.edit(getPage()).then(() => reaction.remove(message.author))
    
            let categoryName = cat_list.find(category => category.icon == reaction.emoji.name).name;
            await msg.edit(getPage(false, categoryName)).then(() => reaction.remove(message.author))
        })

	collector.on('end', async () => {
            if (!msg.deleted) await msg.delete();
        })
	for (let reaction of reactions) await msg.react(reaction)

}

exports.help = {
    name: 'help',
    description: 'Help menu',
    usage: [ 'help' ],
    aliases: [ 'help' ]
}

exports.config = {
    guildOnly: true
}