const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("zitat")
    .setDescription("Hebt Text hervor.")
    .addStringOption(option => option
        .setName("inhalt")
        .setDescription("Der Text, der hervorgehoben werden soll.")
        .setRequired(true)),
    async execute (interaction) {
        interaction.reply({embeds: [
            new MessageEmbed()
            .setDescription(interaction.options.getString("inhalt"))
            .setColor("GREY")
        ]})
    }
}