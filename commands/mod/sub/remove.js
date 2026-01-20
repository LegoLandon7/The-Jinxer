const { jinxed } = require('../../../logic.js');
const { SlashCommandSubcommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');

const data = new SlashCommandSubcommandBuilder()
    .setName('remove')
    .setDescription('Removes the jinx from a user')
    .addUserOption(o => 
        o.setName('target_user')
            .setDescription('The user to remove from the jinx')
            .setRequired(true));

const handler = async (interaction) => {
    await interaction.deferReply();

    const user = interaction.options.getUser('target_user');
    const userId = user.id;
    const guildId = interaction.guild.id;

    if (jinxed[guildId]?.has(userId)) {
        try {
            jinxed[guildId].delete(userId);
            await interaction.editReply('✅ That user\'s jinx has been removed.');
        } catch(err) {
            await interaction.editReply('⚠️ Couldn\'t remove jinx.');
        }
    } else {
        await interaction.editReply('⚠️ That user is not jinxed.');
    }
};

module.exports = { data, handler };