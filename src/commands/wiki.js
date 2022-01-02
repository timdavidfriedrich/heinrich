const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")
const wiki = require("wikijs").default;

module.exports = {
    data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Zeige den Wikipedia-Eintrag eines bestimmten Themas an")
    .addStringOption(option => option
        .setName("thema")
        .setDescription("Welche Wikipedia-Seite soll aufgerufen werden?")
        .setRequired(true)),
    
    /**
     * @param {Interaction} interaction 
     */
    async execute (interaction) {

        const thema = interaction.options.getString("thema")
        const api_url = 'https://de.wikipedia.org/w/api.php'
        const output = await wiki({ apiUrl: api_url })
            .page(thema)
            .then(page => page.summary())
        const url = await wiki({ apiUrl: api_url })
            .page(thema)
            .then(page => page.url())
        
        interaction.reply({embeds: [
            new MessageEmbed()
            .setTitle(thema)
            .setURL(url)
            .setDescription(output.slice(0, 500) + "...")
            .addField("Mehr unter:", url)
            .setColor("DARK_BLUE")
        ]})

    }
}