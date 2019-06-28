module.exports = async message => {
  let database = await Dibot.classes.guilds.getByID(message.guild.id)
  let triggers = database.triggers.find((t) => t.trigger == message.content)

  if(triggers) {
    message.channel.send(`${triggers.response}`)
  }
}
