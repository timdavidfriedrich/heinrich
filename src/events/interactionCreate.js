const { Interaction } = require("discord.js")
const client = require("../index.js")
//require(`./commands/${commandFile}`)

module.exports = {
    name: "interactionCreate",
    /**
     * @param {Interaction} interaction 
     */
    async execute (interaction) {
        if (!interaction.isCommand()) return
        const command = client.commands.get(interaction.commandName)

        if (command) {

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);

                if (interaction.deferred || interaction.replied) {
                    interaction.editReply("Hoppla, mir ist da ein kleines Missgeschick unterlaufen. Ich bitte um Verzeihung! (#edit)")
                } else {
                    interaction.reply("Hoppla, mir ist da ein kleines Missgeschick unterlaufen. Ich bitte um Verzeihung!")
                }
            }
    }
    }
}