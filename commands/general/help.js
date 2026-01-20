// imports
const { SlashCommandBuilder } = require('discord.js');

// subcommand
const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get information about this bot');

// execute
const execute = async (interaction) => {
    await interaction.deferReply();

    // output
    const gitURL = 'https://github.com/LegoLandon7/The-Jinxer';
    const inviteURL = 'https://discord.com/oauth2/authorize?client_id=1463139380289077290&permissions=8&integration_type=0&scope=bot';
    const webURL = 'https://thellego.dev/bots/the-jinxer/';
    const supportURL = 'https://discord.gg/w3QtjkSDMX';

    const output = `[Website](${webURL}) - [Github](${gitURL}) - [Invite](${inviteURL}) - [Support](${supportURL})`;
    await interaction.editReply({content: output});
}

// exports
module.exports = { data, execute, cooldown: 10 };