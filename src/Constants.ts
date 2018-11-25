/**
 * Represents a static repository for constants in the application.
 */
export abstract class TrollBotConstants {
    /**
     * The guild Id of the Oklhoma Melee Discord.
     * @constant
     */
    public static readonly oklahomaMeleeDiscordId: string = "289489728615743488";

    /**
     * The path to the root of the application.
     * @constant
     */
    public static readonly rootPath: string = __dirname + "/../../";

    /**
     * The path to the roasts text file.
     * @constant
     */
    public static readonly roastsPath: string = TrollBotConstants.rootPath + "roasts.txt";
}