const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("lol")
    .setDescription("Assistenz für League of Legends."),
    async execute (interaction) {
        interaction.reply("Funktioniert noch nicht.")
    }
}