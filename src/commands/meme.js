const { SlashCommandBuilder } = require("@discordjs/builders");
const { getImage } = require("random-reddit")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Gibt ein random Meme zurück."),
    async execute (interaction) {
        image = await getImage("memes")
        interaction.reply(image)
    }
}