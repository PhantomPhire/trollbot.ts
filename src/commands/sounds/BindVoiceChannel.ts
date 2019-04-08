import {Command, CommandoClient, CommandoMessage} from "discord.js-commando";
import {Message, VoiceChannel} from "discord.js";
import {GuildAudioPlayer, NameResolution} from "discord-shine";

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

        let userArgs: string[] | undefined = args.split(" ");

        let sGuild = GuildAudioPlayer.getGuildAudioPlayer(msg.guild.id);
        let voiceChannel: VoiceChannel | undefined = NameResolution.commandMessageToVoiceChannel(userArgs, msg, msg.guild);

        if (voiceChannel === undefined) {
            return msg.say("Error: No valid voice channel found");
        }

        sGuild.boundVoiceChannel = voiceChannel;
        return msg.say("Successfully bound to " + voiceChannel.toString());
    }
}
module.exports = BindVoiceChannel;