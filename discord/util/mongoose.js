const mongoose = require('mongoose')
module.exports = {
	init: () => {
		// Set Options
		const DatabaseOptions = {
			useNewUrlParser: true,
			reconnectTries: Number.MAX_VALUE,
			reconnectInterval: 500,
			poolSize: 5,
			connectTimeoutMS: 10000,
            family: 4
		}
		// Connect
		mongoose.connect(process.env.database, DatabaseOptions)
		mongoose.set('useFindAndModify', false)
		mongoose.Promise = global.Promise
		// Events
		mongoose.connection.on('connected', () => {
			Dibot.log.db(`Mibot database connected!`)
		})

		mongoose.connection.on('err', err => {
			Dibot.log.db(`Mibot database error: \n ${err.stack}`)

		})
		mongoose.connection.on('disconnected', () => {
			Dibot.log.db(`Mibot database disconnected`)
		})
	}
}