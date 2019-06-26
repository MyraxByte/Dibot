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
}