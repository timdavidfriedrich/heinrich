const { Client } = require("discord.js")



module.exports = {
    name: "ready",
    /**
     * @param {Client} client 
     */
    execute (client) {
        console.log("\nHEINRICH: Bin drin.\n")
        client.user.setActivity({type:"LISTENING", name:"/heinrich"})
    }
}