const { SlashCommandBuilder } = require("@discordjs/builders");
const voice = require("@discordjs/voice");
const { Interaction } = require("discord.js");
require("@discordjs/opus")
require("ffmpeg-static")
require("libsodium")


const DisTube = require("distube")

url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rickroll")
    .setDescription("Rickrolls vom Feinsten.")

    .addSubcommand(subCommand => subCommand
        .setName("start") 
        .setDescription("Startet einen Rickroll.")
        .addStringOption(option => option
            .setName("voice-channel")
            .setDescription("Welcher Sprachkanal soll traumatisiert werden?")))
            
    .addSubcommand(subCommand => subCommand 
        .setName("stop")
        .setDescription("Stoppt den aktuellen Rickroll.")),

    /**
     * @param {Interaction} interaction 
     */
    async execute (interaction) {

        const client = require("../index.js")
        const distube = new DisTube.default(client)

        switch (interaction.options.getSubcommand()) {

            case "start": {
                if (interaction.options.getString("voice-channel") != null) {
                    channel = interaction.guild.channels.cache.find(
                        channel => channel.name === interaction.options.getString("voice-channel"))
                    if (channel === null) return
                    distube.playVoiceChannel(interaction.guild.channels.cache.find(channel), url)
                    interaction.reply("Hihihihihihi, ich bin ja so lustig.")
                } else {
                    if (interaction.member.voice.channel == null) {
                        interaction.reply(`Du befindest dich in keinem Voice-Channel!\nEntweder du trittst einem bei und versuchst es erneut, oder du gibst "/rickroll start <Ziel-Channel>" ein, um einen bestimmten Voice-Channel zu ärgern.`)
                    } else {
                        distube.playVoiceChannel(interaction.member.voice.channel, url)
                        interaction.reply("https://i.giphy.com/media/Ju7l5y9osyymQ/giphy.webp")
                    }
                    
                }

                break
            }

            case "stop": {
                //TODO: Checken, ob überhaupt ein Rickroll aktiv ist.
                voice.getVoiceConnection(interaction.guildId).disconnect() // "918483733269602354"
                interaction.reply("Okokokok, ich höre ja schon auf...")
                break
            }
            
            default: {
                interaction.reply("Fehler beim Rickroll.")
                console.log("RICKROLL-ERROR: idk")
                break
            }
        }
    }
}