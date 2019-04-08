import {Command, CommandoClient, CommandoMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "discord-shine";

/**
 * A command for requesting the bot to skip the next item in the playlist.
 */
class Skip extends Command {
    /**
     * Initializes a new instance of the Skip class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "skip",
            group: "sounds",
            memberName: "skip",
            description: "Skip current sound in queue."
        });
    }

    /**
     * Tests the command for proper permissions.
     * @param msg The message that was posted.
     */
    public hasPermission(msg: CommandoMessage): boolean {
        if (msg.member == undefined) {
            return true;
        }
        return msg.member.hasPermission("ADMINISTRATOR");
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

        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).skip();
        return msg.say("Skipping...");
    }
}
module.exports = Skip;