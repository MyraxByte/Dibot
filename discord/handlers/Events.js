const fs = require('fs')
const path = require('path')

module.exports = client => {

	this.eventsDirectory = 'events'
	if (!fs.existsSync(`./discord/${this.eventsDirectory}`)) { 
      throw new Error(`Directory '${this.eventsDirectory}' not found.`) 
    }

    this.events = fs.readdirSync(`./discord/${this.eventsDirectory}/`).filter(file => 
    	!fs.statSync(path.join(`./discord/${this.eventsDirectory}/`, file)).isDirectory()).filter(file => 
    	file.endsWith('.js'))

    for (let event of this.events) {
    	event = event.replace(/\.js$/i, '')

	    module.exports = { event: require(`../${this.eventsDirectory}/${event}`)(client) }
	    Dibot.log.info(`Event ${Dibot.colors.yellow(event)} loaded`)
    }
}
