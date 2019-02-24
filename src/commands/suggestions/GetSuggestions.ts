import {GuildMember, Message} from "discord.js";
import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {SuggestionsManager} from "../../utility/SuggestionsManager";
import {NameResolution} from "../../../DiscordBotUtils";

/**
 * A command for sending a suggestion to a member.
 */
export class GetSuggestions extends Command {
    /**
     * Initializes a new instance of the Getsuggestions class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
                name: "getsuggestions",
                group: "suggestions",
                memberName: "getsuggestions",
                description: "Retrieves entire list of suggestions"
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
    public async run(msg: CommandMessage, args: string, fromPattern: boolean): Promise<Message | Message[] | void> {
        let member: GuildMember | undefined = NameResolution.stringToGuildMember(args, msg.guild);
        if (member != null) {
            let suggestion = SuggestionsManager.getsuggestions();
            if (suggestion !== undefined) {
                return msg.say(suggestion);
            }
            return msg.say("Something went wrong.");
        }
        else
           return msg.say("Aww fuck. How did this happen? Fuuuuuuuuuuuu.");
    }

}
module.exports = GetSuggestions;