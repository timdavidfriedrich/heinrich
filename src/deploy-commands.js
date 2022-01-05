require("dotenv").config()
const fs = require("fs")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")

const commands = []

console.log("HEINRICH: Befehlsdateien werden gescannt...")
const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));

console.log("HEINRICH: Befehl-JSON wird erstellt...")
commandFiles.forEach((commandFile) => {
    const command = require(`./commands/${commandFile}`)
    commands.push(command.data.toJSON())
})

const restClient = new REST({version: "9"}).setToken(process.env.TOKEN)

console.log("HEINRICH: Befehle hochgeladen...")
restClient.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), 
    {body: commands})
    .then(() => console.log("HEINRICH: Befehle erkannt.\n"))
    .catch(console.error)