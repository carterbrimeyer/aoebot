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
    if (input > 0 && input <= 105 && /^\d+$/.test(msg.content)) {
        let dir = 'taunts/T_' + msg.content + '.ogg';
        if (voiceChannel == null) {
            msg.channel.send({
                files: [{
                    attachment: path.join(__dirname, dir),
                }],
                content: (data[input - 1])
            });
            console.log('sent ' + (data[input - 1]));
        }
        else {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: msg.guild.id,
                adapterCreator: msg.guild.voiceAdapterCreator
            });
            const player = createAudioPlayer();
            connection.subscribe(player);
            const resource = createAudioResource(path.join(__dirname, dir));
            player.play(resource);
            console.log('played ' + data[input - 1]);
        }
        if (msg.content == '!taunts') {

        }
    }
}