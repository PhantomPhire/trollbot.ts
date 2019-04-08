import {Command, CommandoClient, CommandoMessage} from "discord.js-commando";
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
     * Runs the command.
     * @param msg The command message.
     * @param args The command arguments.
     * @param fromPattern Whether or not the command is being run from a pattern match.
     */
    public async run(msg: CommandoMessage, args: string, fromPattern: boolean): Promise<Message | Message[]>  {
        if (msg.guild == undefined)
            return msg.say("This command can only be executed in a guild.");

        if (args != undefined && args.length > 0) {
            RoastManager.addRoast(args, msg.guild);
            return msg.say("Roast added");
        }
        else {
            return msg.say("You somehow screwed up dumbass");
        }
    }
}
module.exports = AddRoast;