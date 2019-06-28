module.exports = client => {
  client.on('guildMemberAdd', async member => {
    let database = await Dibot.classes.guilds.getByID(member.guild.id)
    let aRoles = database.autoRoles
    if (aRoles.length == 0) return

    aRoles.forEach((role) => {
      member.addRole(role)
    })
  })
}
