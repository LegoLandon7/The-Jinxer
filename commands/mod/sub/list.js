const { jinxed } = require('../../../logic.js');
const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

const data = new SlashCommandSubcommandBuilder()
    .setName('list')
    .setDescription('Lists all jinxes');

const handler = async (interaction) => {
    await interaction.deferReply();

    const guildId = interaction.guild.id;

    if (jinxed[guildId] && jinxed[guildId].size > 0) {
        const userMentions = Array.from(jinxed[guildId])
            .map(id => `<@${id}>`)
            .join(', ');
        await interaction.editReply(`✅ Currently jinxed users: ${userMentions}`);
    } else {
        await interaction.editReply('⚠️ No users are currently jinxed in this server.');
    }
};

module.exports = { data, handler };