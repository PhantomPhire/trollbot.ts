import {Collection} from "discord.js";
import {TrollBotConstants} from "../Constants";
import fs = require("fs");

/**
 * Defines the delimiter to separate roasts in file
 * @constant
 */
const delimiter: string = "~\n";

/**
 * Defines the placeholder string for usernames in roasts.
 */
const usernamePlaceholder: string = "%USERNAME%";

/**
 * Defines the placeholder string for usernames in roasts in a shorthand form.
 */
const usernameShorthandPlaceholder: string = "%U%";

/**
 * A static repository for holding roasts for TrollBot
 */
export abstract class RoastManager {
    /**
     * The internal collection of roasts.
     */
    private static _roasts: Collection<number, string> = new Collection<number, string>();

    /**
     * Initializes the roast repository.
     */
    public static initialize() {
        RoastManager.readRoastFile();
    }

    /**
     * Adds a roast to the file and saves the file.
     * @param roast The roast to add.
     */
    public static addRoast(roast: string) {
        RoastManager._roasts.set(this._roasts.size, roast);
        fs.appendFileSync(TrollBotConstants.roastsPath, "~\n" + roast);
    }

    /**
     * Gets a random roast with correct formatting.
     * @param username The username to substitute in.
     */
    public static getRoast(username: string): string | undefined {
        if (RoastManager._roasts.size > 0) {
            return RoastManager._roasts.random().replace(usernamePlaceholder, username).replace(usernameShorthandPlaceholder, username);
        }
        return undefined;
    }

    /**
     * Reads in the roast file from memory.
     */
    private static readRoastFile() {
        RoastManager._roasts.clear();

        fs.readFile(TrollBotConstants.roastsPath, (error, data) => {
            let roasts = data.toString().split(delimiter);
            for (let i = 0; i < roasts.length; i++) {
                RoastManager._roasts.set(i, roasts[i]);
            }
        });
    }
}
