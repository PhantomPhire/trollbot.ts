import {Client, Guild, VoiceChannel} from "discord.js";
import {GuildAudioPlayer, SoundFileManager} from "../../DiscordBotUtils";

/**
 * Tells the manager it's time to be a fool again
 * @constant
 */
const foolEvent = "fool";

/**
 * Represents the manager for all things April Fools as far as the troll is concerned
 */
export class AprilFoolsManager  {
    /**
     * The Discord bot client to utilize.
     */
    private _client: Client;

    /**
     * Constructs the foolishness
     * @param client The Discord bot client to utilize.
     * @param tokenIn The Discord bot's login token.
     */
    public constructor(client: Client) {
        this._client = client;
        this.setFoolTimeout();
    }

    /**
     * Starts the foolishness
     */
    private setFoolTimeout() {
        let random = Math.random() * 60000 * 30;

        // Wait a random amount of time and then do stuff
        setTimeout(() => {
            let date = new Date();

            if (date.getMonth() === 3 && date.getDay() < 6) {
                this._client.guilds.forEach(this.trollGuild);
            }

            this.setFoolTimeout();
        },         random);
    }

    /**
     * Trolls a single guild
     */
    private trollGuild(guild: Guild, key: string, map: Map<string, Guild>) {
        if (guild.channels == null) {
            console.log("Guild doesn't have channels?!");
            return;
        }

        let channels = guild.channels!.array();
        let sound = SoundFileManager.getRandomFileSound();

        if (sound == null) {
            return;
        }

        for (let i = 0; i < channels.length; i++) {
            if (channels[i].type != "voice") {
                continue;
            }

            if ((channels[i] as VoiceChannel).members.size > 0) {
                let player = GuildAudioPlayer.getGuildAudioPlayer(guild.id);
                player.joinAndPlay = true;
                player.boundVoiceChannel = channels[i] as VoiceChannel;


                player.add(sound);
                break;
            }
        }
    }
}
