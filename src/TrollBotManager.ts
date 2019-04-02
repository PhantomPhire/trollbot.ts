import * as config from "../../config.json";
import {CommandoClient} from "discord.js-commando";
import {BotManager, GuildAudioPlayer, SoundFileManager} from "../DiscordBotUtils";
import {RoastManager} from "./utility/RoastManager";
import {Trolling} from "./utility/Trolling";
import {AprilFoolsManager} from "./utility/AprilFoolsManager";

/**
 * A wrapper for the TrollBot, managing its events and internals
 */
export class TrollBotManager extends BotManager {

    /**
     * The login manager for keeping the bot online.
     */
    private _foolManager?: AprilFoolsManager;

    /**
     * Initializes a new instance of the TrollBotManager.
     */
    constructor() {
        super(new CommandoClient({ commandPrefix: (<any>config).prefix, owner: (<any>config).owner }));
        RoastManager.initialize();
        this._foolManager = new AprilFoolsManager(this._bot);
        let soundConfig = (<any>config).soundPath as string | undefined;
        if (soundConfig !== undefined) {
            SoundFileManager.initialize((<any>config).soundPath);
        }
    }

    /**
     * Executes the running for the bot.
     */
    public run() {
        super.run((<any>config).token);

        this.setupEventListeners();

        // Read in commands
        this._bot.registry.registerGroup("trolling", "Trolling");
        this._bot.registry.registerGroup("roasts", "Roasts");
        this._bot.registry.registerGroup("sounds", "Sounds");
        this._bot.registry.registerDefaults();
        this._bot.registry.registerCommandsIn(__dirname + "/commands");
    }

    /**
     * Sets up the bot's event listeners.
     */
    private setupEventListeners() {
        // Add function for when bot is ready
        this._bot.on("ready", () => {
            this._bot.user.setActivity("Huehuehue");
            GuildAudioPlayer.loadPersistentGuilds();
        });

        Trolling.addListeners(this._bot);
    }
}