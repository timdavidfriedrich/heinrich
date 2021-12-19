const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require("fs")
const { MessageEmbed } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
    .setName("heinrich")
    .setDescription("Zeigt alle Befehle an, die Heinrich entgegen nehmen kann.")
    //.addStringOption(option => option.setName("frage").setDescription("Stell mir eine Frage."))
    ,
    async execute (interaction) {
            interaction.reply({ embeds: [
                    new MessageEmbed()
                    .setTitle("Meine Dienstleistungen")
                    .setColor("DARK_BLUE")
                    .addFields([
                        {
                            name: "/meme",
                            value: "Random Meme.",
                            inline: true
                        },
                        {  
                            name: "/rickroll", 
                            value: "Rickrolls vom Feinsten.", 
                            inline: true
                        },
                        {
                            name: "/zitat",
                            value: "Hebt Text hervor.",
                            inline: true
                        },
                    ])
                ]
            })
    }
}