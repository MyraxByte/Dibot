const { Client, Collection, RichEmbed } = require('discord.js')
const MainConfig = require('dotenv').config().parsed
const infoPackage = require('./package.json')
const StringHandler = require('./discord/handlers/Languages')
const logger = require('./discord/util/logger')
const colors = require('ansi-colors')
const mongoose = require('./discord/util/mongoose')
const database = require('./discord/util/database')

// ==================
const client = new Client()
// ==================

Dibot = client
Dibot.db = database
Dibot.classes = require('./discord/classes')
Dibot.config = MainConfig
Dibot.package = infoPackage
Dibot.log = logger
Dibot.colors = colors
Dibot.commands = new Collection()
Dibot.aliases = new Collection()
Dibot.embed = RichEmbed
Dibot.locales = new StringHandler()

// ==================

require('./discord/handlers/Events.js')(client)
require('./discord/handlers/Commands.js')(client)

// ==================
client.login(Dibot.config.token).then(() => {
	mongoose.init()
	Dibot.log.info(`Bot login as ${Dibot.colors.yellow(client.user.tag)}!`)
	Dibot.db.bot.findOne({ _id: client.user.id }, (err, conf) => {
		if (err) return console(err)
		if (!conf) {
			conf = new Dibot.db.bot({
				_id: client.user.id,
				owners: '223355525826347018' })
            conf.save()
		}
	})
})

client.once('ready', () => {
		client.user.setPresence({
			game: { name: `Discord Hack Week 2019`, type: 'PLAYING' },
			status: 'online' // online, dnd, idle
		})
		console.log(Dibot.colors.red(`============================`))
	})
