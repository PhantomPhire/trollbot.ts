import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {RoastManager} from "../../utility/RoastManager";

/**
 * A command for adding a roast to the list of roasts.
 */
export class AddRoast extends Command {
    /**
     * Initializes a new instance of the AddRoast class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "addroast",
            group: "roasts",
            memberName: "addroast",
            description: "Adds a roast and appends it to the file. Use %USERNAME% (or %U%) for username substitution."
            });
    }

    /**
     * Tests the command for proper permissions.
     * @param msg The message that was posted.
     */
    public hasPermission(msg: CommandMessage): boolean {
        if (!msg.guild) {
            return false;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
    }

    /**
     * Runs the command.
     * @param msg The command message.
     * @param args The command arguments.
     * @param fromPattern Whether or not the command is being run from a pattern match.
     */
    public async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[]>  {
        if (args != undefined && args.length > 0) {
            RoastManager.addRoast(args);
            return msg.say("Roast added");
        }
        else {
            return msg.say("You somehow screwed up dumbass");
        }
    }
}
module.exports = AddRoast;