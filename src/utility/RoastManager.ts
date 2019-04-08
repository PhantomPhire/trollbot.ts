import {Collection, Guild} from "discord.js";
import {TrollBotConstants} from "../Constants";
import fs = require("fs");
import {ClientAccess} from "discord-shine";
import {RoastsSaveState} from "./RoastsSaveSate";

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
 * The default roast to start every guild with
 */
const quintessentialImmatureRoast: string = "No u";

/**
 * A static repository for holding roasts for TrollBot
 */
export abstract class RoastManager {
    /**
     * The internal collection of roasts.
     */
    private static _roasts: Collection<string, Collection<number, string>> = new Collection<string, Collection<number, string>>();

    /**
     * Initializes the roast repository.
     */
    public static initialize() {
        RoastManager.readRoastFile();
    }

    /**
     * Adds a roast to the file and saves the file.
     * @param roast The roast to add.
     * @param guild The guild to add the roast for.
     */
    public static addRoast(roast: string, guild: Guild) {
        if (!RoastManager._roasts.has(guild.id)) {
            RoastManager.addGuild(guild);
        }

        RoastManager._roasts.get(guild.id)!.set(this._roasts.size, roast);
        RoastManager.writeRoastsFile();
    }

    /**
     * Gets a random roast with correct formatting.
     * @param username The username to substitute in.
     * @param guild The guild to get the roast for.
     */
    public static getRoast(username: string, guild: Guild): string | undefined {
        if (RoastManager._roasts.has(guild.id)) {
            this.addGuild(guild);
        }

        if (!RoastManager._roasts.has(guild.id))
        RoastManager.addGuild(guild);

        let roastGuild = RoastManager._roasts.get(guild.id);
        if (roastGuild!.size > 0) {
            let randomRoast = roastGuild!.random();
            if (randomRoast != undefined) {
                return randomRoast.replace(usernamePlaceholder, username).replace(usernameShorthandPlaceholder, username);
            }
        }
        return undefined;
    }

    /**
     * Reads in the roast file from memory.
     */
    private static readRoastFile() {
        RoastManager._roasts.clear();

        if (!fs.existsSync(TrollBotConstants.roastsPath)) {
            return;
        }

        fs.readFile(TrollBotConstants.roastsPath, (error, data) => {
            let roasts = JSON.parse(data.toString()) as Array<RoastsSaveState>;
            for (let i = 0; i < roasts.length; i++) {
                let roastCollection = new Collection<number, string>();
                for (let j = 0; j < roasts[i].Roasts.length; j++) {
                    roastCollection.set(j, roasts[i].Roasts[j]);
                }

                RoastManager._roasts.set(roasts[i].GuildId, roastCollection);
            }
        });
    }

    /**
     * Writes the current roasts to file
     */
    private static writeRoastsFile() {
        let roastsSaveState = new Array<RoastsSaveState>();

        RoastManager._roasts.forEach((value: Collection<number, string>, key: string, map: Map<string, Collection<number, string>>) => {
            let state = new RoastsSaveState(key, new Array<string>());
            value.forEach((value: string, key: number, map: Map<number, string>) => {
                state.Roasts.push(value);
            });
            roastsSaveState.push(state);
        });

        fs.writeFileSync(TrollBotConstants.roastsPath, JSON.stringify(roastsSaveState));
    }

    /**
     * Adds a guild to the guild roast map
     * @param guild The guild to add to the map
     */
    private static addGuild(guild: Guild) {
        if (RoastManager._roasts.has(guild.id))
            return;

        let newGuild = new Collection<number, string>();
        newGuild.set(0, quintessentialImmatureRoast);
        RoastManager._roasts.set(guild.id, newGuild);
    }
}
