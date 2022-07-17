"use strict";

const { Bot } = require("./Bot");

const helpMessage = "\x1b[2mType /help for commands\x1b[0m";

const commands = {
    "help": {
        desc: "Get this help dialog",
        /** @param {Bot} bot */
        run: async () => {
            console.log(
                Object.keys(commands).reduce((acc, cmd) => `${acc}\x1b[46m/${cmd}\x1b[0m - ${commands[cmd].desc}\n`, "")
            );
        },
    },
    "reload": {
        desc: "reload commands",
        /** @param {Bot} bot */
        run: async (bot) => {
            bot.commands.reloadAll();
            console.log("Reloaded commands")
        }
    },
    "test": {
        desc: "test command",
        /** @param {Bot} bot */
        run: async (bot) => {
            console.log(bot.commands);
        }
    },
    "quit": {
        desc: "stop the server",
        run: () => {
            process.exit();
        }
    }
}

/**
 * Handler for console commands
 */
class ConsoleHandler {

    constructor(bot) {

        /** @type {Bot} */
        this.bot = bot;

        process.stdin.on('data', inputStdin => {
            this.processCommand(inputStdin.toString());
        });

    }

    processCommand(data) {
        if (!data.startsWith("/")) return console.log(helpMessage);
        const args = data.slice(1).trim().split(' ');
        const command = args.shift().toLowerCase();
        if(!commands[command]) return console.log(`\x1b[31mINVALID COMMAND.\x1b[0m ${helpMessage}`);
        commands[command].run(this.bot);
    }

}

module.exports = ConsoleHandler;