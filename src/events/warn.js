module.exports = {
    name: "warn",
    run: async (client, warning) => {
        client.logger.warn(warning);
    },
};