const fs = require('fs')
const path = require('path')

module.exports = client => {

	this.commandsDirectory = 'commands'
	if (!fs.existsSync(`./discord/${this.commandsDirectory}`)) { 
      throw new Error(`Директория команд '${this.commandsDirectory}' не найдена.`) 
    }
	
    this.categories = fs.readdirSync(`./discord/${this.commandsDirectory}`).filter(file => 
  		fs.statSync(path.join(`./discord/${this.commandsDirectory}`, file)).isDirectory())


    for (let category of this.categories) {
    	Dibot.log.info(`Loading commands from ${Dibot.colors.red(category)} category`)

    	let commandFiles = fs.readdirSync(path.resolve(`./discord/${this.commandsDirectory}/${category}`)).filter(file => 
    		!fs.statSync(path.resolve(`./discord/${this.commandsDirectory}/`, category, file)).isDirectory()).filter(file => 
    		file.endsWith('.js'))

    	for (let file of commandFiles) {
    		file = file.substr(0, file.length - 3)
    		cmdName = file.charAt(0).toUpperCase() + file.slice(1)
    		Dibot.log.info(`Command ${Dibot.colors.cyan(cmdName)} loaded`)

    		file = require(`../${this.commandsDirectory}/${category}/${file}`)
    		Dibot.commands.set(file.help.name.toLowerCase(), file)

    		file.config.category = category

		    for (let alias of file.help.aliases) {
		      	Dibot.aliases.set(alias.toLowerCase(), file.help.name)
		    }
		}
  	}
}
