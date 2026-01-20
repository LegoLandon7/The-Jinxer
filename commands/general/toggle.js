const { readJson, writeJson } = require('../../utils/files.js');
const { SlashCommandBuilder } = require('discord.js');
const path = require('path');

const data = new SlashCommandBuilder()
    .setName('toggle')
    .setDescription('Opt out of the jinxing. Or opt back in.')
    .addStringOption(o => 
        o.setName('choice')
        .setDescription('The language to translate from')
        .addChoices(
            { name: 'Opt-in', value: 'true' },
            { name: 'Opt-out', value: 'false' }
        ).setRequired(true))

const execute = async (interaction) => {
    await interaction.deferReply();

    const userId = interaction.user.id;
    const choice = interaction.options.getString('choice');

    const optData = readJson(path.resolve(__dirname, '../../data/opt.json'));

    if (choice === 'false') {
        if (!optData[userId]) optData[userId] = {};
        optData[userId].enabled = true;
        await interaction.editReply('✅ You have **opted out of jinxes**. give up to 5 seconds for changes to take effect.');
    } else if (choice === 'true') {
        if (optData[userId]) delete optData[userId];
        await interaction.editReply('✅ You have **opted back into jinxes**. give up to 5 seconds for changes to take effect.');
    } else {
        await interaction.editReply('⚠️ Invalid.');
    }

    writeJson(path.resolve(__dirname, '../../data/opt.json'), optData);
}

module.exports = { data, execute, cooldown: 10 };