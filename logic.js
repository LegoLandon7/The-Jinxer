const { readJson } = require('./utils/files.js');
const path = require('path');

const jinxed = {};
const messages = {};
let ignored = {};

function listenMessages(client) {
    client.on('messageCreate', async (message) => {
        if (!message.guild || message.author.bot) return;

        const guildId = message.guild.id;
        const authorId = message.author.id;
        const now = Date.now();
        const content = message.content.trim().toLowerCase();

        // ignore check
        if (ignored[authorId] && ignored[authorId].enabled === true) return;

        // data
        if (!messages[guildId]) messages[guildId] = [];
        if (!jinxed[guildId]) jinxed[guildId] = new Set();

        // delete message if user is jinxed
        if (jinxed[guildId].has(authorId)) {
            try {
                await message.delete();
            } catch {}
        }

        // unjinx if mentioned by someone else
        if (
            message.mentions.users.size > 0 &&
            message.mentions.roles.size === 0 &&
            !message.mentions.everyone // only mentiom user
        ) {
            for (const [mentionedId] of message.mentions.users) {
                if (jinxed[guildId].has(mentionedId) && mentionedId !== authorId) {
                    jinxed[guildId].delete(mentionedId);

                    await message.channel.send(
                        `**${message.author.username}** freed <@${mentionedId}> from the jinx!`
                    );
                }
            }
        }

        // check for repeated messages to jinx
        for (const entry of messages[guildId]) {
            if (
                entry.userId !== authorId &&
                entry.content === content &&
                now - entry.date < 2000 &&
                !jinxed[guildId].has(authorId)
            ) {
                // jinx this user
                jinxed[guildId].add(authorId);

                // notify
                await message.channel.send(
                    `<@${authorId}> you are **jinxed**! Someone must mention you to free you. opt out using the /toggle command.`
                );

                break;
            }
        }

        // store current message
        messages[guildId].push({
            userId: authorId,
            content,
            date: now
        });

        // remove old messages
        messages[guildId] = messages[guildId].filter(m => now - m.date < 3000);
    });
}

function readIgnore() {
    ignored = readJson(path.resolve(__dirname, './data/opt.json')) || {};
}

module.exports = { listenMessages, readIgnore, jinxed };