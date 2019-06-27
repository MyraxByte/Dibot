module.exports = client => {
  // Add reaction
  client.on("messageReactionAdd", async (reaction, user) => {
    if(!user) return
    if(user.bot) return
    if(!reaction.message.channel.guild) return

    let database = await Dibot.classes.guilds.getByID(reaction.message.guild.id)
    let emoji_list = database.reaction_role.map(e => e.emoji)
    let matchReact = database.reaction_role.find(db => db.channel == reaction.message.channel.id && db.message == reaction.message.id && db.emoji == reaction.emoji.name)

    if (matchReact) {
      reaction.message.guild.member(user).addRole(matchReact.role)
    }
  })

  // Remove reaction
  client.on("messageReactionRemove", async (reaction, user)=>{
    if(!user) return
    if(user.bot) return
    if(!reaction.message.channel.guild) return

    let database = await Dibot.classes.guilds.getByID(reaction.message.guild.id)
    let emoji_list = database.reaction_role.map(e => e.emoji)
    let matchReact = database.reaction_role.find(db => db.channel == reaction.message.channel.id && db.message == reaction.message.id && db.emoji == reaction.emoji.name)

    if (matchReact) {
      reaction.message.guild.member(user).removeRole(matchReact.role)
    }
  })
}
