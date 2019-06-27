module.exports = client => {
    // Join member to server
    client.on('guildMemberAdd', async member => {
      // Load Database
      Dibot.guildDB = await Dibot.classes.guilds.getByID(member.guild.id)
      // Check log channel in database
      let logChannel = member.guild.channels.get(Dibot.guildDB.logs.members)
      if (!logChannel) return
      const memberJoin = new Dibot.embed()
         .setColor(0x4E9C0C)
         .setDescription(`${member.user}, joined the server`)
      // Send log message
      logChannel.send(memberJoin)
    })
    // Leave member from the server
    client.on('guildMemberRemove', async member => {
      // Load Database
      Dibot.guildDB = await Dibot.classes.guilds.getByID(member.guild.id)
      // Check log channel in database
      let logChannel = member.guild.channels.get(Dibot.guildDB.logs.members)
      if (!logChannel) return
      const memberLeave = new Dibot.embed()
         .setColor(0x4E9C0C)
         .setDescription(`${member.user}, left from the server`)
      // Send log message
      logChannel.send(memberLeave)
    })
    //==============================
    // Create role logs
    client.on('roleCreate', async role => {
      // Load Database
      Dibot.guildDB = await Dibot.classes.guilds.getByID(role.guild.id)
      // Check log channel in database
      if (!role.guild) return
      let logChannel = role.guild.channels.get(Dibot.guildDB.logs.roles)
      if (!logChannel) return
      const audit = await role.guild.fetchAuditLogs({limit: 1})
      const rolecreate = audit.entries.first().executor
      const embed = new Dibot.embed()
          .setColor(0x18E698)
          .setDescription(`${rolecreate} created the role **<@&${role.id}>**`)
      logChannel.send(embed)
    })
    // Delete role logs
    client.on('roleDelete', async role => {
      // Load Database
      Dibot.guildDB = await Dibot.classes.guilds.getByID(role.guild.id)
      // Check log channel in database
      if (!role.guild) return
      let logChannel = role.guild.channels.get(Dibot.guildDB.logs.roles)
      if (!logChannel) return
      const audit = await role.guild.fetchAuditLogs({limit: 1})
      const rolecreate = audit.entries.first().executor
      const embed = new Dibot.embed()
          .setColor(0xDC6154)
          .setDescription(`${rolecreate} removed role **${role.name}**`)
      logChannel.send(embed)
    })
    // Change role logs
    client.on('roleUpdate', async (oldRole, newRole) => {
      // Load Database
      Dibot.guildDB = await Dibot.classes.guilds.getByID(newRole.guild.id)
      // Check log channel in database
      if (!oldRole.guild) return
      if (oldRole.name === newRole.name) return;
      let logChannel = newRole.guild.channels.get(Dibot.guildDB.logs.roles)
      if (!logChannel) return
      const audit = await newRole.guild.fetchAuditLogs({limit: 1})
      const rolecreate = audit.entries.first().executor
      const embed = new Dibot.embed()
          .setColor(0x3498DB)
          .setDescription(`${rolecreate} changed role **<@&${newRole.id}>**`)
      logChannel.send(embed)
    })
    // Add and Remove Role logs
    client.on('guildMemberUpdate', async (oldMember, newMember) => {
      // Load Database
      Dibot.guildDB = await Dibot.classes.guilds.getByID(newMember.guild.id)
      // Check log channel in database
      if (!newMember.guild) return
      const audit = await newMember.guild.fetchAuditLogs({limit: 1})
      const firstentries = audit.entries.first().executor

      let modChannel = newMember.guild.channels.get(Dibot.guildDB.logs.roles)
      if (!modChannel) return
      if (oldMember.roles !== newMember.roles) {
          if (newMember.roles.size > oldMember.roles.size) {
              let oldRoles = oldMember.roles.keyArray()
              let newRoles = newMember.roles.keyArray().filter(i => !oldRoles.includes(i)).concat(oldRoles.filter(i => !newMember.roles.keyArray().includes(i)))
              const embed = new Dibot.embed()
                  .setColor(0x11CF4D)
                  .setDescription(`${firstentries} given the role **<@&${newRoles}>** for ${newMember.user}`)
              modChannel.send(embed)
          }

          if (newMember.roles.size < oldMember.roles.size) {
              let oldRoles = oldMember.roles.keyArray()
              let newRoles = newMember.roles.keyArray().filter(i => !oldRoles.includes(i)).concat(oldRoles.filter(i => !newMember.roles.keyArray().includes(i)))
              const embed = new Dibot.embed()
                  .setColor(0xE74C3C)
                  .setDescription(`${firstentries} removed the role **<@&${newRoles}>** from ${newMember.user}`)

              modChannel.send(embed)
          }
      }
    })
    //==============================
}
