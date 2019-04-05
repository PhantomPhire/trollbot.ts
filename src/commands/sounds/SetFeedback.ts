import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message, TextChannel} from "discord.js";
import {GuildAudioPlayer} from "../../../DiscordBotUtils";

/**
 * A command for binding the bot to a new text channel for voice feedback.
 */
class SetFeedback extends Command {
    /**
     * Initializes a new instance of the SetFeedback class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "setfeedback",
            group: "sounds",
            memberName: "setfeedback",
            aliases: ["feedback"],
            description: "Sets the current channel for bot sound feedback"
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
        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).feedbackChannel = msg.channel as TextChannel;
        return msg.say(msg.channel + " set as new voice feedback channel");
    }
}
module.exports = SetFeedback;