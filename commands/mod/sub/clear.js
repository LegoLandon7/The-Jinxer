const { jinxed } = require('../../../logic.js');
const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

const data = new SlashCommandSubcommandBuilder()
    .setName('clear')
    .setDescription('Removes all jinxes');

const handler = async (interaction) => {
    await interaction.deferReply();

    const guildId = interaction.guild.id;

    if (jinxed[guildId]) {
        try {
            jinxed[guildId].clear();
            await interaction.editReply('✅ All jinxes in this server have been removed.');
        } catch (err) {
            console.error(err);
            await interaction.editReply('⚠️ Could not remove jinxes.');
        }
    } else {
        await interaction.editReply('⚠️ No users are currently jinxed in this server.');
    }
};

module.exports = { data, handler };