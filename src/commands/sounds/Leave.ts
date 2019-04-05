import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

/**
 * A command for requesting the bot to leave a voice channel.
 */
class Leave extends Command {
    /**
     * Initializes a new instance of the Leave class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "leave",
            group: "sounds",
            memberName: "leave",
            description: "Forces bot to leave current voice channel"
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
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).leave();

        return msg.say("Leaving...");
    }
}
module.exports = Leave;