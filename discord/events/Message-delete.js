module.exports = client => {
  // Remove Reaction Role Message From database
  client.on('messageDelete', async message => {
    if (!message.guild) return

    let database = await Dibot.classes.guilds.getByID(message.guild.id)
    let matchReact = database.reaction_role.find(db => db.channel == message.channel.id && db.message == message.id)
    let lengthMatch = database.reaction_role.filter((db) => db.channel == message.channel.id && db.message == message.id)

    if (matchReact) {
      let guild = await Dibot.classes.guilds.deleteReactionMessage(message.guild.id, message.id, lengthMatch.length)
    }
  })

}
