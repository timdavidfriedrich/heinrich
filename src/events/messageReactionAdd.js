const { channel } = require("diagnostics_channel")
const { MessageReaction, MessageEmbed } = require("discord.js")
const client = require("..")

marked_channel = "920666965570383872" //* "markiert"

module.exports = {
    name: "messageReactionAdd",
    /**
     * @param {MessageReaction} reaction 
     */
    execute(reaction) {

        //TODO: Markieren für ALLE Nachrichten möglich
        //TODO: Delete if Count > 1, ansonsten anpinnen

        /// Link zur Nachricht, auf die reagiert wurde. (Springt innerhalb Discords direkt zum Original)
        message_url = `https://discordapp.com/channels/${reaction.message.guildId}/${reaction.message.channelId}/${reaction.message.id}`
        marked_url = `https://discordapp.com/channels/${reaction.message.guildId}/${marked_channel}/${reaction.message.id}`

        /// Stern-Reaktion auf Nachricht?
        if (reaction.emoji.name == "⭐") {

            /// Reaktion in @marked_channel? => löschen ("Markierung aufheben")
            if (reaction.message.channelId == marked_channel && reaction.count > 1) {
                console.log(`Lösche: "${reaction.message.content}"`)
                reaction.message.delete()

            /// Nachricht nicht leer? (Doppel-Ausführung verhindern)
            } else if (reaction.message.content.toString() != "") {
                console.log("REAKTION: Nachricht mit Stern markiert.")

                /// 
                if (reaction.message.content.toString().indexOf('redd.it') > -1) {
                    reaction.message.guild.channels.cache.get(marked_channel).send({embeds: [
                        new MessageEmbed()
                        .setTitle(reaction.message.author.username)
                        .setURL(message_url)
                        .setImage(reaction.message.content.toString())
                    ]}).then((message) => {
                        message.react("⭐")
                    }).catch()
                } else {
                    reaction.message.guild.channels.cache.get(marked_channel).send({embeds: [
                        new MessageEmbed()
                        .setTitle(reaction.message.author.username)
                        .setURL(message_url)
                        .setDescription(reaction.message.content.toString())
                    ]}).then((message) => {
                        message.react("⭐")
                    }).catch()
                }
            }
        }

    }
}

/*
        /// Stern-Reaktion auf Nachricht?
        if (reaction.emoji.name == "⭐") {

            reaction.remove()

            if (reaction.count > 1) {
                console.log(`Lösche: "${reaction.message.content}"`)
                reaction.message.delete()

            } else {
                
                

            }

        }
*/