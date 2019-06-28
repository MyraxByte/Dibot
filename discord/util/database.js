const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Bot = new Schema({
	_id: String,
	owners: [{ type: String }],
	supports: [{ type: String }]

})

const Guild = new Schema({
    _id: String,
    guildID: String,
    prefix: { type: String, default: 'd.' },
    temp_channel: String,
    temp_category: String,
    locale: { type: String, default: 'ru'},
    logs: {
			members: String,
			roles: String,
			moderation: String

		},
		reaction_role: [{
			channel: String,
			message: String,
			emoji: String,
			role: String
		}],
		mutes: [{
			user: String,
			mute_type: String
		}]

})

const User = new Schema({
	_id: String,
	userID: String,
	locale: { type: String, default: 'ru'}
})


module.exports = {
    guilds: mongoose.model('guild', Guild),
    bot: mongoose.model('bot', Bot),
    users: mongoose.model('user', User)
}
