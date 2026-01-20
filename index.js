// imports
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const { Client, GatewayIntentBits } = require('discord.js');

const { retrieveCommands } = require('./init/retrieve-commands');
const { handleSlashCommands } = require('./init/execute-commands');
const { setPresence } = require('./init/set-presence');

const { listenMessages, readIgnore } = require('./logic.js');

// client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        'MESSAGE', 
        'CHANNEL', 
        'REACTION', 
        'GUILD_MEMBER', 
        'USER'
    ]
});

client.once('clientReady', () => {
    // initialization
    retrieveCommands(client);
    handleSlashCommands(client);
    setPresence(client);

    // core logic
    listenMessages(client);
    setInterval(() => readIgnore(), 5000);

    // message
    console.log(`✅ Logged in as ${client.user.tag}`);
});

// login
client.login(process.env.BOT_TOKEN);