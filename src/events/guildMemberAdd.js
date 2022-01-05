const { GuildMember } = require("discord.js")

const welcome_channel = "918483733269602356";

function welcome_message (member) {
    welcome_messages = [
        `Eure Präsenz ehrt mich, ${member.toString()}.`,
        `Küss die Hand, ${member.toString()}.`,
        `Zum Wohl, ${member.toString()}.`,
        `Gegrüßet seist du, ${member.toString()}.`,
        `Euer Hochwohlgeboren, ${member.toString()}, ich heiße Sie willkommen!`,
        `Seid willkommen, ${member.toString()}.`,
        `Gott zum Gruße, ${member.toString()}.`,
        `Es ist mir eine Freude, Euch hier zu erblicken, ${member.toString()}.`
    ]
    return welcome_messages[Math.floor(Math.random() * welcome_messages.length)]
}

module.exports = {
    name: "guildMemberAdd",
    /**
     * @param {GuildMember} member 
     */
    execute (member) {
        member.guild.channels.cache.get(welcome_channel).send(welcome_message(member))
    }
}

