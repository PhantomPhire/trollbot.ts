import {Command, CommandoClient, CommandoMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {Trolling} from "../../utility/Trolling";

/**
 * A command for requesting the bot to stop trolling.
 */
class StopTrolling extends Command {
    /**
     * Initializes a new instance of the StopTrolling class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "stoptrolling",
            group: "trolling",
            memberName: "stoptrolling",
            description: "Makes bot stop trolling",
            aliases: ["stahp"]
        });
    }

    /**
     * Runs the command.
     * @param msg The command message.
     * @param args The command arguments.
     * @param fromPattern Whether or not the command is being run from a pattern match.
     */
    public async run(msg: CommandoMessage, args: string, fromPattern: boolean): Promise<Message | Message[]> {
        if (msg.guild == undefined)
            return msg.say("This command can only be executed in a guild.");

        Trolling.stopTrolling(msg.guild);
        return msg.say("Alright fine...");
    }
}
module.exports = StopTrolling;