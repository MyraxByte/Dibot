module.exports = class User {
	// get user by id
	static getByID(id) {
		return new Promise((resolve, reject) => {
            Dibot.db.users.findById(id, async (err, res) => {
                if (err) return reject(err)
                if (!res) {
                    res = new Dibot.db.users({_id: id})
                    await res.save()
                }
                resolve(res)
            })
        })
	}
}