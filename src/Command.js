"use strict";

/**
 * The representation a command and it's utilities and formatting.
 */
class Command {

    /**
     * @param {string} name - Command name.
     * @param {Object} client - Client object
     * @param {string} file - filename for reload purposes
     * @param {Object} data - Options for the command.
     * @param {number|string} data.type - CHAT_INPUT = 1, USER = 2, MESSAGE = 3
     * @param {string} data.description - Description for the chat command
     * @param {array} data.options - Discord options array with parameters
     * @param {Object|Array|null} data.default_member_permissions - discord default member permission
     */
    constructor(name, client, file, data = {}) {

        const {
            type = 1, // CHAT_INPUT	= 1, USER = 2, MESSAGE = 3
            description = "",
            options = [],
            default_member_permissions = null,
        } = data;

        this.client = client;

        /** @readonly */
        this.name = name;
        if (!name) throw new Error(`${this.constructor.name} Missing name`);

        /** @readonly */
        this.file = file;

        /** @readonly */
        this.type = type;

        /** @readonly */
        this.description = description;

        /** @readonly */
        this.options = options;

        /** @readonly */
        this.default_member_permissions = default_member_permissions;

    }

    get() {
        const cmdData = {
            name: this.name,
            default_member_permissions: this.default_member_permissions,
            dm_permission: this.dm_permission,
        };
        if (["CHAT_INPUT", 1].includes(this.type)) cmdData.description = this.description;
        cmdData.type = this.type;
        if (this.options) cmdData.options = this.options;
        return cmdData;
    }

    run() {
        throw new Error(`${this.constructor.name} NOT IMPLEMENTED`);
    }

    menu() {
        throw new Error(`${this.constructor.name} MENU TRIGGERED WHILE NOT IMPLEMENTED`);
    }
}

module.exports = Command;