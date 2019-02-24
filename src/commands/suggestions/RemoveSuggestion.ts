import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {SuggestionsManager} from "../../utility/SuggestionsManager";

/**
 * A command for removeing a suggestion to the list of suggestions.
 */
export class RemoveSuggestion extends Command {
    /**
     * Initializes a new instance of the Removesuggestion class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "removesuggestion",
            group: "suggestions",
            memberName: "removesuggestion",
            description: "Removes a suggestion and updates the file"
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
            let result = SuggestionsManager.removesuggestion(args);
            if (result)
                return msg.say("Suggestion removed!");
            else
                return msg.say("Can you not read? This was never suggested, fuck face.");
        }
        else {
            return msg.say("You somehow screwed up dumbass");
        }
    }
}
module.exports = RemoveSuggestion;