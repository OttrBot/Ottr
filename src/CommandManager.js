const { Collection } = require("discord.js");
const { readdirSync } = require("fs");

/**
 * Command handler, loader, reloader
 * @param {Bot} parent - Command manager options
 */
class CommandManager {

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

        /** @type {Collection} */
        this.commands = new Collection();

        /** @type {Array} */
        this.commandsObject = [];

        this.init();
    }

    /**
     * Load all commands from the default command directory
     * @returns {Promise<boolean>} for when done
     */
    init() {
        const commandFiles = readdirSync("./src/commands").filter(file => file.endsWith(".js"));
        for (const file of commandFiles) {
            const commandFile = require(`./commands/${file}`);
            const command = new commandFile({ file: file, client: this.bot });
            if (!command?.name) continue;
            if (this.commands.has(command.name)) {
                this.logger.error(`${file} is using a name that's already been registered by another command [skipping]`);
                continue;
            }
            this.commands.set(command.name, command);
            this.commandsObject.push(command.get());
            this.logger.info(`Loaded Command: ${command.name}`);
        }
        this.logger.info(`Loaded ${this.commands.size} commands.`);
    }

    /**
     * Load all commands from the default command directory
     * @param {string} commandName - Name of command to reload
     * @returns {Promise<boolean>} for when done with true for success, false for fail
     */
    reload(commandName) {
        return new Promise((resolve, _) => {
            const file = this.commands.get(commandName)?.file;
            if (!file) resolve(false);
            delete this.commands.delete(commandName);
            delete require.cache[require.resolve(`./commands/${file}`)];
            const commandFile = require(`./commands/${file}`);
            const command = new commandFile({ file: file, client: this.bot });
            this.commands.set(command.name, command);
            this.logger.info(`${commandName} has been reloaded`);
            resolve(true);
        });
    }

    /**
     * Reloads all commands
     */
    reloadAll() {
        [...this.commands.keys()].forEach(cmd => {
            this.reload(cmd);
        });
    }

    run(name) {

    }

}

module.exports = CommandManager;