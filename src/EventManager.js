const { readdirSync } = require("fs");

/**
 * Event handler, loader, reloader
 * @param {Bot} parent
 */
class EventManager {

    constructor(parent) {

        /**
         * @typedef {import("./Bot")} Bot
         * @type {Bot}
         */
        this.bot = parent;

        /**
         * @typedef {import("winston") } Logger
         * @type {Logger}
         */
        this.logger = parent.logger;

        this.init();
    }

    /**
     * Load all events from the default events directory
     */
    init() {
        let events = 0;
        const eventFiles = readdirSync("./src/events").filter(file => file.endsWith(".js"));
        for (const file of eventFiles) {
            const event = require(`./events/${file}`);
            if (event.once) this.bot.once(event.name, (...args) => event.run(this.bot, ...args));
            else this.bot.on(event.name, (...args) => event.run(this.bot, ...args));
            events++;
        }
        this.logger.info(`Loaded ${events} events.`);
    }

}

module.exports = EventManager;