const Command = require("../Command");

class Cmd extends Command {
    constructor({ file, client }) {
        super("ping", client, file, {
            description: "Check my connection",
        });
    }

    async run(client, interaction, args) {

        await interaction.deferReply({ ephemeral: true }).catch(console.error);
        const sent = await interaction.fetchReply();
        const timeDiff = (sent.createdAt) - (interaction.createdAt);
        return interaction.editReply(`Pong!\n🔂 **RTT**: ${timeDiff} ms\n💟 **Heartbeat**: ${Math.round(client.ws.ping)} ms`).catch(console.error);

    }
}


module.exports = Cmd;
