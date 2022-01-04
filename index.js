const fs = require('fs')
var token = '';
try {
    const data = fs.readFileSync('token.txt', 'utf8');
    console.log('Token Loaded.');
    token = data;
} catch (err) {
    console.error('Token loading error! ' + err);
}

const path = require('path');

const { Client, Intents } = require('discord.js');

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });
const { joinVoiceChannel, AudioPlayerStatus, createAudioPlayer, AudioResource, createAudioResource } = require('@discordjs/voice');


client.login(token);

client.on('ready', readyBot);

const data = (fs.readFileSync('tauntlist.txt', 'utf8').split('\n'));

function readyBot() {
    console.log('Bot is online.');
}

client.on('messageCreate', parseMessage);

function parseMessage(msg) {
    let input = parseInt(msg.content);

    let voiceChannel = msg.member.voice.channel;

    if (voiceChannel == null && /^\d+$/.test(msg.content) && input > 0 && input <= 105) {
        try {
            msg.channel.send({
                files: [{
                    attachment: (data[(3 * input) - 1]),
                    name: input + '.ogg'
                }],
                content: (data[(3 * input) - 2])
            });
        } catch (err) {
            console.error('Tauntlist loading error! ' + err);
        }
        console.log("sent " + (data[(3 * input) - 2]));
    }
    else if (/^\d+$/.test(msg.content) && input > 0 && input <= 105){
        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: msg.guild.id,
            adapterCreator: msg.guild.voiceAdapterCreator
        });
        const player = createAudioPlayer();
        connection.subscribe(player);

        const resource = createAudioResource((data[(3 * input) - 1]));
        player.play(resource);
        console.log("played " + (data[(3 * input) - 2]));
    }
}