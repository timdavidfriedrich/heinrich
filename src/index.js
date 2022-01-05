
function main() {
    /// Importiere .env, filesystem, discord
    require("dotenv").config()
    const fs = require("fs")
    const { Client, Collection, Intents } = require("discord.js")

    /// Füge alle nötigen Intents (Berechtigungen) hinzu
    const client = new Client({intents: [
        Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, 
        Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS
    ]})

    /// Erstelle Kollektion für commands
    // Hier werden dann alle Commands aus den Dateien gespeichert.
    client.commands = new Collection()


    /// Stelle @client zum Export für andere Dateien bereit.
    module.exports = client

    /// Lese alle Dateinamen der Commands und Events aus und speichere sie je in einer Liste
    const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
    const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))

    /// Füge die Commands (anhand der Dateinamen) in die @commands-Kollektion ein
    commandFiles.forEach((commandFile) => {
        const command = require(`./commands/${commandFile}`)
        client.commands.set(command.data.name, command)
    })

    /// Erstelle quasi eine Art Funktion für jede Event-Datei
    /// Das heißt, dem Bot werden die Events sichtbar gemacht
    eventFiles.forEach((eventFile) => {
        const event = require(`./events/${eventFile}`)
        client.on(event.name, async (...args) => event.execute(...args))
    })


    /// Logge den Bot ein
    client.login(process.env.TOKEN)
}

try {
    main();
} catch (error) {
    console.log(error)
    console.log("HEINRICH: Kritischer Error!!!\nIch starte neu!")
    main();
}
