import {Command, CommandoClient, CommandMessage} from "discord.js-commando";
import {Message, VoiceChannel} from "discord.js";
import {GuildAudioPlayer, NameResolution} from "../../../DiscordBotUtils";

/**
 * A command for binding the client to a new voice channel per guild.
 */
class BindVoiceChannel extends Command {
    /**
     * Initializes a new instance of the BindVoiceChannel class
     * @param client The commando client to utilize.
     */
    constructor(client: CommandoClient) {
        super(client, {
            name: "bindvoicechannel",
            group: "sounds",
            memberName: "bindvoicechannel",
            aliases: ["bind"],
            description: "Sets bound voice channel to parameter"
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
        let userArgs: string[] | undefined = args.split(" ");

        let sGuild = GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id);
        let voiceChannel: VoiceChannel | undefined = undefined;
        for (let i = 0; i < userArgs.length; i++) {
            voiceChannel = NameResolution.commandMessageToVoiceChannel(userArgs[i], msg, msg.guild);
            if (voiceChannel !== undefined) {
                break;
            }
        }

        if (voiceChannel === undefined) {
            return msg.say("Error: No valid voice channel found");
        }

        sGuild.boundVoiceChannel = voiceChannel;
        return msg.say("Successfully bound to " + voiceChannel.toString());
    }
}
module.exports = BindVoiceChannel;