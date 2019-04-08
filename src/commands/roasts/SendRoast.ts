import {GuildMember, Message} from "discord.js";
import {Command, CommandoClient, CommandoMessage} from "discord.js-commando";
import {RoastManager} from "../../utility/RoastManager";
import {NameResolution} from "discord-shine";

/**
 * A command for sending a roast to a member.
 */
export class SendRoast extends Command {
    /**
     * Initializes a new instance of the SendRoast class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
                name: "sendroast",
                group: "roasts",
                memberName: "sendroast",
                description: "Sends a roast."
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

        let member: GuildMember | undefined = NameResolution.stringToGuildMember(args, msg.guild);
        if (member != null) {
            let roast = RoastManager.getRoast(member.toString(), msg.guild);
            if (roast !== undefined) {
                return msg.say(roast);
            }
            return msg.say("Something went wrong.");
        }
        else
           return msg.say("Get your bitch ass into a public channel, I ain't roastin' you in private");
    }

}
module.exports = SendRoast;