(async() => {
    "use strict";

    const Bot = require("./Bot");
    const ConsoleHandler = require("./ConsoleHandler");

    // BOT
    const bot = new Bot();

    // CONSOLE INPUT HANDLER
    const consoleHandler = new ConsoleHandler(bot);

    // ERROR CATCHING
    process.on("unhandledRejection", err => { bot.logger.error(err)});
    process.on("uncaughtException", err => { bot.logger.error(err)});

    bot.logger.info("System Loaded.");

})();