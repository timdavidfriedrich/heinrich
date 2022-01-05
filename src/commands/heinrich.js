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
                            name: "/lol",
                            value: "Funktioniert noch nicht",
                            inline: true
                        },
                        {
                            name: "/mc",
                            value: "Minecraft-Rezept",
                            inline: true
                        },
                        {
                            name: "/meme",
                            value: "Zufälliges Meme",
                            inline: true
                        },
                        {  
                            name: "/rickroll", 
                            value: "Rickroll vom Feinsten",
                            inline: true
                        },
                        {  
                            name: "/wiki", 
                            value: "Wikipedia-Eintrag",
                            inline: true
                        },
                        {
                            name: "/zitat",
                            value: "Hebt Text hervor",
                            inline: true
                        },
                        {
                            name: "Weiteres:",
                            value: `Reagiere mit :star: auf Nachrichten, um sie im "markiert"-Channel zu speichern!`,
                        }
                    ])
                ]
            })
    }
}