const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js")
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cheerio = require("cheerio");
const craft_url = "https://www.minecraftcrafting.info/";


module.exports = {
    data: new SlashCommandBuilder()
    .setName("mc")
    .setDescription("Sucht nach Minecraft-Rezepten (in Englisch).")
    .addStringOption(option => option
        .setName("item-name")
        .setDescription("Gib einen Itemnamen (in Englisch) ein, um dessen Rezept zu erhalten.")
        .setRequired(true)),
    /**
     * @param {Interaction} interaction 
     */
    async execute (interaction) {

        const response = await fetch(craft_url)
        const body = await response.text()
        const $ = cheerio.load(body);

        const recipes = $("html > body > table > tbody > tr > td > table > tbody > tr")
            .map((index, element) => {
                if ($($(element).find("td")[0]).text() !== "Name") return {
                    name: $($(element).find("td")[0]).text(),
                    material: $($(element).find("td")[1]).text(),
                    recipe: craft_url + $($(element).find("td > img")).attr("src"),
                    description: $($(element).find("td")[3]).text()
                }
            })
            .toArray()

        const suggestions = []
        const input = interaction.options.getString("item-name").toLowerCase().replace("*","")
        
        for (var i = 0; i < recipes.length; i++) {
            if (recipes[i].name.toLowerCase() == input) {
                suggestions.push(recipes[i])
                break
            }

            if (recipes[i].name.toLowerCase().includes(input)) {
                suggestions.push(recipes[i])
            }
        }

        console.log(suggestions)
        
        try {
            if (suggestions.length > 1) {
                var embed = new MessageEmbed().setTitle("Meintest du:").setColor("GOLD")
                for (var i = 0; i < suggestions.length; i++) {
                    embed.addField(suggestions[i].name, suggestions[i].description)
                }
                interaction.reply({embeds: [embed]})
    
            } else if (suggestions.length == 1) {
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle(suggestions[0].name)
                    .addFields([
                        {
                            name: "Beschreibung:",
                            value: suggestions[0].description,
                        },
                        {
                            name: "Du benötigst:",
                            value: suggestions[0].material,
                        }
                    ])
                    .setImage(suggestions[0].recipe)
                    .setColor("DARK_GREEN")
                ]})
    
            } else {
                interaction.reply({embeds: [
                    new MessageEmbed()
                    .setTitle("Kein Ergebnis gefunden.")
                    .addFields([
                        {
                            name: "Mögliche Ursachen:",
                            value:
                            " - Das Item ist nicht herstellbar \n" +
                            " - Die Eingabe wurde nicht in englischer Sprache verfasst \n" +
                            " - Die Eingabe weicht stark vom eigentlichen Namen ab \n"
                        }
                    ])
                    .setColor("DARK_RED")
                ]});
                
            }
        } catch (error) {
            console.log(error)
            interaction.reply("Es gab ein Fehler beim Rezepte-Suchen. Ich habe Tim gefragt. Der weiß auch noch nicht, woran das liegt.")
        }

        

        

    }
}