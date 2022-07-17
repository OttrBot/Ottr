module.exports = {
    name: "ready",
    once: true,
    run: async (client) => {
        client.logger.info(`Logged in as ${client.user.tag}`);
    },
};