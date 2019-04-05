import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
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
    public async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[]> {
        Trolling.stopTrolling(msg.guild);
        return msg.say("Alright fine...");
    }
}
module.exports = StopTrolling;