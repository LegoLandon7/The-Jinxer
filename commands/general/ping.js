// imports
const { SlashCommandBuilder } = require('discord.js');

// subcommand
const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check bot latency');

// execute
const execute = async (interaction) => {
    await interaction.deferReply();

    // data
    const latency = Date.now() - interaction.createdTimestamp;
    const wsPing = Math.round(interaction.client.ws.ping);

    // output
    const output = `🏓 **Pong**\n**- Latency: **${latency}ms\n**- Websocket: **${wsPing}ms`
    await interaction.editReply({content: output});
}

// exports
module.exports = { data, execute, cooldown: 10 };