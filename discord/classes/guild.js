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

    static async setPrefix(id, prefix) {
        let guild = await Guild.getByID(id)

        guild.prefix = prefix
        await guild.save()

        return {msg: `Prefix successfully changed to **\`${guild.prefix}\`**`};
    }

    static async setTempChan(id, channel, category) {
        let guild = await Guild.getByID(id)
        guild.temp_category = category
        guild.temp_channel = channel
        await guild.save()

        return {msg: `Temp channel successfully created!`}
    }

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
}
