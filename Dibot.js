const { Client, Collection, RichEmbed } = require('discord.js')
const MainConfig = require('dotenv').config().parsed
const infoPackage = require('./package.json')
const StringHandler = require('./discord/handlers/Languages')
const logger = require('./discord/util/logger')
const colors = require('ansi-colors')
const mongoose = require('./discord/util/mongoose')
const database = require('./discord/models')




// ==================
const client = new Client()
// ==================
Dibot = {}
Dibot.config = MainConfig
Dibot.package = infoPackage
Dibot.log = logger
Dibot.colors = colors
Dibot.commands = new Collection()
Dibot.aliases = new Collection()
Dibot.embed = new RichEmbed()
Dibot.locales = new StringHandler()
// ==================

require('./discord/handlers/Events.js')(client)
require('./discord/handlers/Commands.js')(client)



// ==================
client.once('ready', () => {
		client.user.setPresence({
			game: { name: `за Drakengard`, type: 'WATCHING' },
			status: 'online' // online, dnd, idle
		})
		console.log(Dibot.colors.red(`============================`))
	})

client.login(Dibot.config.token).then(() => {
	mongoose.init()
	Dibot.log.info(`Bot login as ${Dibot.colors.yellow(client.user.tag)}!`)
})