module.exports = class Guild {
		// get Guild by id
		static getByID(id) {
			return new Promise((resolve, reject) => {
	            Dibot.db.guilds.findById(id, async (err, res) => {
	                if (err) return reject(err)
	                if (!res) {
	                    res = new Dibot.db.guilds({_id: id})
	                    await res.save()
	                }
	                resolve(res)
	            })
	        })
		}

		// Prefix
    static async setPrefix(id, prefix) {
        let guild = await Guild.getByID(id)

        guild.prefix = prefix
        await guild.save()
        return {msg: `Prefix successfully changed to **\`${guild.prefix}\`**`};
    }

		// Temp Channels
    static async setTempChan(id, channel, category) {
        let guild = await Guild.getByID(id)
        guild.temp_category = category
        guild.temp_channel = channel
        await guild.save()
        return {msg: `Temp channel successfully created!`}
    }

		// Logs
		static async setMemberLogs(id, channel) {
				let guild = await Guild.getByID(id)
				guild.logs.members = channel
				await guild.save()
				return {msg: `Join and Leave Member logs added`}
		}

		static async setRoleLogs(id, channel) {
				let guild = await Guild.getByID(id)
				guild.logs.roles = channel
				await guild.save()
				return {msg: `Role logs successfully added`}
		}

		static async setModLogs(id, channel) {
				let guild = await Guild.getByID(id)
				guild.logs.moderation = channel
				await guild.save()
				return {msg: `Moderation logs successfully added`}
		}

		// Reaction role
		static async addReactionRole(id, channel, message, emoji, role) {
			let guild = await Guild.getByID(id)
			guild.reaction_role.push({ channel: channel, message: message, emoji: emoji, role: role })
			await guild.save()
			return {msg: `Reaction role added!`}
		}

		static async removeReactionRole(id, channel, message, emoji, role) {
			  let guild = await Guild.getByID(id)
        let index = guild.reaction_role.findIndex(i => i.channel == channel && i.message == message && i.emoji == emoji && i.role == role)
        guild.reaction_role.splice(index, 1)
        await guild.save()
        return {msg: `Reaction role removed`}
    }

		static async deleteReactionMessage(id, message, num) {
			  let guild = await Guild.getByID(id)
        let index = guild.reaction_role.findIndex(i => i.message == message)
        guild.reaction_role.splice(index, num)
        await guild.save()
        return {msg: `Reaction role removed`}
    }

		// Mutes { Add || Remove || Get }
		static async addTextMute(id, user) {
			let guild = await Guild.getByID(id)
			let mute_type = 'text mute'
			if(guild.mutes.filter(m => m.user == user && m.mute_type == mute_type).length !== 0) return
			guild.mutes.push({ user: user, mute_type: mute_type })
		  await guild.save()
			return {msg: `Text Mute Added!`}
		}

		static async delTextMute(id, user) {
			let guild = await Guild.getByID(id)
			let mute_type = 'text mute'
			if(guild.mutes.filter(m => m.user == user && m.mute_type == mute_type).length == 0) return
			let index = guild.reaction_role.findIndex(i => i.user == user && i.type == type)
			guild.mutes.splice(index, 1)
			await guild.save()
			return {msg: `Text Mute removed!`}
		}

		static async addVoiceMute(id, user) {
			let guild = await Guild.getByID(id)
			let mute_type = 'voice mute'
			if(guild.mutes.filter(m => m.user == user && m.mute_type == mute_type).length !== 0) return
			guild.mutes.push({ user: user, mute_type: mute_type })
			await guild.save()
			return {msg: `Voice Mute Added!`}
		}

		static async delVoiceMute(id, user) {
			let guild = await Guild.getByID(id)
			let mute_type = 'voice mute'
			if(guild.mutes.filter(m => m.user == user && m.mute_type == mute_type).length == 0) return
			let index = guild.reaction_role.findIndex(i => i.user == user && i.type == type)
			guild.mutes.splice(index, 1)
			await guild.save()
			return {msg: `Voice Mute removed!`}
		}

		static async removeAllMutes(id) {
			let guild = await Guild.getByID(id)
			if(!guild.mutes) return
			let ml = guild.mutes.length
			guild.mutes.splice(0, ml)
			await guild.save()
			return {msg: `All Mutes removed!`}
		}

		// Triggers
		static async addTrigger(id, trigger, response) {
			let guild = await Guild.getByID(id)
			if (guild.triggers.filter(t => t.trigger == trigger).length !== 0) return
			guild.triggers.push({ trigger: trigger, response: response})
			await guild.save()
			return {msg: `Trigger \`${trigger}\` - \`${response}\` added`}
		}

		static async delTrigger(id, trigger) {
			let guild = await Guild.getByID(id)
			if (guild.triggers.filter(t => t.trigger == trigger).length == 0) return
			let index = guild.triggers.findIndex(i => i.trigger == trigger)
			guild.triggers.splice(index, 1)
			await guild.save()
			return {msg: `Trigger \`${trigger}\` removed`}
		}

		static async removeAllTriggers(id) {
			let guild = await Guild.getByID(id)
			if(!guild.triggers) return
			let tl = guild.triggers.length
			guild.triggers.splice(0, tl)
			await guild.save()
			return {msg: `All Triggers removed`}
		}

		// filters
		static async toggleInvite(id, Boolean) {
			let guild = await Guild.getByID(id)
			guild.filters.invite = Boolean
			await guild.save()
			return
		}

		// Auto Assing Roles
		static async addARole(id, role) {
			let guild = await Guild.getByID(id)
			if (guild.autoRoles.filter(r => r == role).length !== 0) return
			guild.autoRoles.push(role)
			await guild.save()
			return {msg: `Auto Assign Role <@&${role}> added!`}
		}

		static async delARole(id, role) {
			let guild = await Guild.getByID(id)
			if (guild.autoRoles.filter(r => r == role).length == 0) return
			let index = guild.autoRoles.findIndex(r => r == role)
			guild.autoRoles.splice(index, 1)
			await guild.save()
			return {msg: `Auto Assign Role <@&${role}> removed!`}
		}
}
