## Dibot for Discord Hack Week 2019
Dibot is a universal bot for Discord that has a lot of useful things for guilds, and also helps in their moderation.
Bot was developed using: [Node]([https://nodejs.org/](https://nodejs.org/)), [Discordjs]([https://discord.js.org](https://discord.js.org/)), [Mongoose]([https://mongoosejs.com/](https://mongoosejs.com/))

![Completion Status: WiP](https://img.shields.io/badge/Completion%20Status-Work%20in%20Progress-critical.svg) ![Language: ](https://img.shields.io/github/languages/top/Mirazex/Dibot.svg)  ![license: ](https://img.shields.io/github/license/Mirazex/Dibot.svg)


## Short Documentation for Dibot

### **Features:**
 - Default moderation commands `[ Ban,Kick, Mute, Clear messages ]`
 - Logs
 - Reaction Roles
 - Temporary channels
 - Auto Role Assignment
 - Filters `[ Bad Words, Links, Invites ]`
 - Message Triggers

### **Commands:**
> **Utils** Category

|Command|Args|Description|
|--|--|--|
|`d.help`|`none`|Shows the help menu|
> **Moderation** Category

|Command|Args|Description|
|--|--|--|
|`d.clear`| `1-100` |Clear messages|
|`d.ban`| `@users` |Ban user on server|
|`d.unban-all`| *none* |Unban all banned users|
|`d.kick`| `@users` |Kick user from the server|
|`d.text-mute`| `@users` |Mute member on all text channels|
|`d.text-unmute`| `@users` |Unmute member on all text channels|
|`d.voice-mute`| `@users` |Mute member on all voice channels|
|`d.voice-unmute`| `@users` |Unmute member on all voice channels|
|`d.unmute-all`| *none* |Unmute all members|
|`d.mute-list`| *none* |Show mute list|
|`d.role-add`| `<@role> <@users>` |Add roles for members|
|`d.role-remove`| `<@role> <@users>` |Remove roles from members|
|`d.role-removeAll`| `@user` |Remove all roles from member|
> **Administration** Category

|Command|Args|Description|
|--|--|--|
|`d.prefix`| `your prefix` | Set prefix for server|
|`d.temp-channels` | `create` or `remove` | Create or Remove temporary channels|
|`d.rearole-add`|`<#channel> <message_id> <:emoji:> <@role>`| Add reaction role for specific message |
|`d.rearole-remove`|`<#channel> <message_id> <:emoji:> <@role>`| Remove reaction role from specific message |
|`d.trigger-add` |`<trigger> <response>` | Add trigger with response|
|`d.trigger-remove`|`trigger`| Remove trigger with response|
|`d.trigger-removeAll`| *none* | Remove all triggers|
|`d.trigger-list`| *none* | Show trigger list for server |
|`d.aarole-add`|`@role`| Add role to Auto Assignment|
|`d.aarole-remove`|`@role` |Remove role to Auto Assignment|
|`d.aarole-list`|*none* | Show Auto Role Assignment list for server|
|`d.badword-add`| `word`| Add bad word to blacklist |
|`d.badword-remove`| `word`| Remove bad word from blacklist |
|`d.badword-clear`| *none* | Clear blacklist with bad words |
|`d.badword-list`| *none* | Show blacklist with bad words |
|`d.logs-members`|`add` or `remove` | Add or Remove Join and Leave member log |
|`d.logs-mod`|`add` or `remove` | Add or Remove moderation log |
|`d.logs-roles` |`add` or `remove` |Add or Remove roles log |
|`d.filter-invite` | *none* |Toggle Invite links |
|`d.filter-links`| *none* |Toggle links filter |
|`d.filter-words`| *none* |Toggle words filter |


## To-Do List
#### **My list To-Do for Dibot**

- [x] Kick, Ban, commands
- [x] Clear, AddRole, RemoveRole commands
- [x] Text and Voice Mute commands
- [x] Temp Channels
- [x] Logs for moderation
- [x] Role Reaction
- [x] Auto Assign Roles
- [x] Invite filter
- [x] Triggers
- [x] Words filter
- [x] Links filter
- [x] Short Documentation
- [ ] Improve visual commands
