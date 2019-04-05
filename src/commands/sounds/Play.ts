import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

/**
 * A command for requesting the bot to play what is in its playlist on the designated voice channel.
 */
class Play extends Command {
    /**
     * Initializes a new instance of the Play class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "play",
            group: "sounds",
            memberName: "play",
            description: "Play the current playlist"
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
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).play();
        return msg.say("Playing...");
    }
}
module.exports = Play;