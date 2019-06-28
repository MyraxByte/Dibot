module.exports = client => {
  client.on('message', async message => {
      if (message.author.bot) return
      if (!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return

      let database = await Dibot.classes.guilds.getByID(message.guild.id)
      let triggers = database.triggers.find((t) => t.trigger == message.content)

      if(triggers) {
        message.channel.send(`${triggers.response}`)
      }
  })
}
