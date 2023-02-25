const Command = require("../Command");
const { version } = require("discord.js");
const pkg = require("../../package.json");

class Cmd extends Command {
    constructor({ file, client }) {
        super("bot", client, file, {
            description: "Information on yours truly",
            options: [
                {
                    name: "share",
                    description: "Post my reply for everyone to see",
                    type: "BOOLEAN",
                },
            ],
        });
    }

    async run(client, interaction, args) {

        const embed = client.embed()
            .setTitle(client.user.tag.split("#")[0])
            .setThumbnail(client.user.avatarURL({ size: 1024, dynamic: true }))
            .addField("Uptime", `<t:${Math.round(client.readyAt / 1000)}:R>`, true)
            .addField("Created", `<t:${Math.round(client.user.createdTimestamp / 1000)}:D>`, true)
            .addField("Memory", `Used: ${Math.round(((process.memoryUsage().heapUsed / 1000000) + 0.00001) * 100) / 100} Mb\nTotal: ${Math.round(((process.memoryUsage().heapTotal / 1000000) + 0.00001) * 100) / 100} Mb\nLibs: ${Math.round(((process.memoryUsage().rss / 1000000) + 0.00001) * 100) / 100} Mb`, true)
            .addField("Versions", `Bot: ${pkg.version}\nDjs: ${version}\nNode: ${process.version}`, true)
            .addField("Created By", pkg.author, true)
            .addField("Support the creator", "[Paypal](https://www.paypal.me/zfbx) | [Patreon (Monthly)](https://www.patreon.com/zfbx)", true)
            .setDescription("Just a fun loving Otter to play games and be useful");

        if (args.share) return interaction.reply({ embeds: [ embed ] });
        return interaction.sreply({ embeds: [ embed ] });
    }
}


module.exports = Cmd;
