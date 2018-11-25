import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

/**
 * A command for requesting the contents of the bot's current playlist.
 */
class Playlist extends Command {
    /**
     * Initializes a new instance of the Playlist class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "playlist",
            group: "sounds",
            memberName: "playlist",
            description: "Displays the current playlist."
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
        return msg.say(GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).getQueueListing(), {});
    }
}
module.exports = Playlist;