import {Command, CommandoClient, CommandoMessage} from "discord.js-commando";
import {Message, TextChannel} from "discord.js";
import {GuildAudioPlayer} from "discord-shine";

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
    public hasPermission(msg: CommandoMessage): boolean {
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
    public async run(msg: CommandoMessage, args: string, fromPattern: boolean): Promise<Message | Message[]> {
        if (msg.guild == undefined)
            return msg.say("This command can only be executed in a guild.");

        GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id).feedbackChannel = msg.channel as TextChannel;
        return msg.say(msg.channel + " set as new voice feedback channel");
    }
}
module.exports = SetFeedback;