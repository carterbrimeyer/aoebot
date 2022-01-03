const fs = require('fs')
var token = "";
try {
    const data = fs.readFileSync('token.txt', 'utf8');
    console.log("Token Loaded.");
    token = data;
} catch (err) {
    console.error("Token loading error! " + err);
}

const path = require('path');

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.login(token);

client.on('ready', readyBot);

function readyBot() {
    console.log('Bot is online.');
}

client.on('messageCreate', parseMessage);

function parseMessage(msg) {
    let input = parseInt(msg.content);
    if (/^\d+$/.test(msg.content) && input > 0 && input <= 105) {
        console.log(input);
        try {
            const data = (fs.readFileSync('tauntlist.txt', 'utf8').split("\n"));
            console.log("Tauntlist Loaded.");
            msg.channel.send({
                files: [{
                    attachment: (data[(3 * input) - 1]),
                    name: (parseInt(data[3*input]) - 1) + ".ogg"
                }],
                content: (data[(3 * input) - 2])
            });
        } catch (err) {
            console.error("Tauntlist loading error! " + err);
        }
    }
}