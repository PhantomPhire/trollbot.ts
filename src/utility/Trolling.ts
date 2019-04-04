import {Channel, Guild, GuildMember, Message, TextChannel, User, VoiceChannel} from "discord.js";
import {CommandoClient} from "discord.js-commando";
import {ClientAccess, GuildAudioPlayer, SoundFileManager} from "../../DiscordBotUtils";
import {RoastManager} from "./RoastManager";

/**
 * Represents the arbiter of reaction based trolling in the TrollBot.
 */
export abstract class Trolling {
    /**
     * Keeps track of tracked members.
     */
    private static _trackedMembers: Map<string, string> = new Map<string, string>();

    /**
     * Adds trolling based listeners to a Discord Bot.
     * @param bot The bot client to add the listeners to.
     */
    public static addListeners(bot: CommandoClient) {
        bot.on("message", Trolling.onMessageReceived);
        bot.on("typingStart", Trolling.onUserTyping);
        bot.on("voiceStateUpdate", Trolling.onMemberVoiceStateChanged);
        bot.on("guildMemberSpeaking", Trolling.onMemberSpeaking);
    }

    /**
     * Adds a guild member to the list of trolled guild members. Only one person can be trolled at a time per guild.
     * @param member The guild member to be trolled.
     */
    public static addTrolled(member: GuildMember) {
        if (member == null || member.guild == null) {
            console.error("Error: TrollReactions.addTrolled received bad member.");
            return;
        }

        if (Trolling._trackedMembers.has(member.guild.id)) {
            Trolling._trackedMembers.delete(member.guild.id);
        }
        Trolling._trackedMembers.set(member.guild.id, member.id);

        if (member.voiceChannel != null) {
            Trolling.onMemberVoiceStateChanged(member, member);
        }
    }

    /**
     * Removes guild member from being trolled.
     * @param guild The guild to stop trolling on.
     */
    public static stopTrolling(guild: Guild) {
        if (guild != null && this._trackedMembers.has(guild.id)) {
            this._trackedMembers.delete(guild.id);

            if (ClientAccess.client()!.voiceConnections.has(guild.id)) {
                let player = GuildAudioPlayer.getGuildAudioPlayer(guild.id);
                player.leave();
            }
        }
    }

    /**
     * Reacts to user messages. Reacts to certain triggers and has a chance to roast the user.
     * @param message The message received.
     */
    private static onMessageReceived(message: Message) {
        if (message.member == null) {
            return;
        }

        let diceRoll = Math.random() * 1000;
        if (diceRoll <= 10 && message.author.username != "Troll") {
            let roast = RoastManager.getRoast(message.member.toString());
            if (roast !== undefined) {
                message.channel.send(roast);
            }
        }
    }

    /**
     * Reacts to an user typing. Has a low chance to troll them.
     * @param channel The channel the user is typing on.
     * @param user The user that is typing.
     */
    private static onUserTyping(channel: Channel, user: User) {
        let diceRoll = Math.random() * 1000;
        if (diceRoll <= 10 && user.username != "Troll") {
            let textChannel = channel as TextChannel;
            textChannel.send(user.toString() + ", bitch, I see you typing");
        }
    }

    /**
     * Reacts to a guild member's voice state changing. Will follow from channel to channel if trolling member.
     * @param oldMember The member's old voice state.
     * @param newMember The member's new voice state.
     */
    private static onMemberVoiceStateChanged(oldMember: GuildMember, newMember: GuildMember) {
        // Only react to tracked members
        if (newMember.guild == null ||
            !Trolling._trackedMembers.has(newMember.guild.id) ||
            newMember.id !== Trolling._trackedMembers.get(newMember.guild.id)) {

            if (newMember.voiceChannel != null) {
                let player = GuildAudioPlayer.getGuildAudioPlayer(newMember.voiceChannel.guild.id);
                if (player != null) {
                    player.join(newMember.voiceChannel);
                    let sound = SoundFileManager.getFileSound("oh_shiiit");
                    if (sound != null) {
                        player.add(sound);
                        player.play();
                    }
                }
            }
            return;
        }

        // No need to do anything if we're already connected to the same channel
        if (newMember.voiceChannel != null && ClientAccess.client()!.voiceConnections.has(newMember.guild.id)) {
            let connection = ClientAccess.client()!.voiceConnections.get(newMember.guild.id);
            if (connection!.channel.id === newMember.voiceChannel.id) {
                return;
            }
        }

        let player = GuildAudioPlayer.getGuildAudioPlayer(newMember.guild.id);
        if (player != null) {
            if (newMember.voiceChannel == null) {
                player.leave();
            }
            else {
                player.join(newMember.voiceChannel);
            }
        }
    }

    /**
     * Reacts to a member speaking. Will reply mockingly if trolling member.
     * @param member The member speaking.
     * @param speaking Wheter or not the user is currently speaking.
     */
    private static onMemberSpeaking(member: GuildMember, speaking: boolean) {
        // Only react to tracked members
        if (member.guild == null ||
            !Trolling._trackedMembers.has(member.guild.id) ||
            member.id !== Trolling._trackedMembers.get(member.guild.id)) {
            return;
        }

        // Do not react if we are not in a voice channel
        if (!ClientAccess.client()!.voiceConnections.has(member.guild.id)) {
            return;
        }

        if (speaking) {
            let player = GuildAudioPlayer.getGuildAudioPlayer(member.guild.id);
            let sound = SoundFileManager.getRandomFileSound();
            if (player != null && sound !== undefined && !player.playing && player.connected) {
                player.add(sound);
                player.play();
            }
        }
    }
}