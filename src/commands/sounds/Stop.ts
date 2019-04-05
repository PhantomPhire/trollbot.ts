import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

/**
 * A command for requesting the bot to stop playback.
 */
class Stop extends Command {
    /**
     * Initializes a new instance of the Stop class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "stop",
            group: "sounds",
            memberName: "stop",
            description: "Stops playback of all sound and exits VoiceChannel."
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
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).stop();
        return msg.say("Stopping...");
    }
}
module.exports = Stop;