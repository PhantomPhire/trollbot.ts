import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {NameResolution} from "../../../DiscordBotUtils";
import {Trolling} from "../../utility/Trolling";

/**
 * A command for requesting the bot to troll a member.
 */
class StartTrolling extends Command {
    /**
     * Initializes a new instance of the StartTrolling class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "starttrolling",
            group: "trolling",
            memberName: "starttrolling",
            description: "Makes bot start trolling a member",
            aliases: ["troll"]
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
        let member = NameResolution.stringToGuildMember(args, msg.guild);

        if (member != null) {
            Trolling.addTrolled(member);
            return msg.say("Huehuehue");
        }
        else {
            return msg.say("Who the hell is that supposed to be?");
        }
    }
}
module.exports = StartTrolling;