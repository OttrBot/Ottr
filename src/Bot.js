"use strict";

require("dotenv").config();
const { Client } = require("discord.js");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;
const Commands = require("./CommandManager");
const Events = require("./EventManager");

/**
 * Represents a single discord.js client shard
 * @extends {Client}
 */
class Bot extends Client {

    constructor() {
        super({
            intents: 0,
            shards: "auto",
            allowedMentions: {
                parse: ['users']
            },
        });

        // LOG HANDLER
        this.logger = createLogger({
            level: "info",
            format: combine(
                timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
                printf(({ level, message, timestamp }) => {
                    return `${timestamp} [${level}]: ${message}`;
                }),
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: "console.log" }),
            ],
        });

        // COMMAND MANAGER
        /** @type {Commands} */
        this.commands = new Commands(this);

        // EVENT MANAGER
        /** @type {Events} */
        this.events = new Events(this);

        // this.on("debug", logger.info);

        this.login(process.env.DISCORD_TOKEN).catch(e => { this.logger.error(e) });

    }

}

module.exports = Bot;