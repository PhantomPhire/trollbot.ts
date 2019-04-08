/**
 * Represents a static repository for constants in the application.
 */
export abstract class TrollBotConstants {
    /**
     * The path to the root of the application.
     * @constant
     */
    public static readonly rootPath: string = __dirname + "/../../";

    /**
     * The path to the roasts text file.
     * @constant
     */
    public static readonly roastsPath: string = TrollBotConstants.rootPath + "roasts.json";

    /**
     * The path to the suggestions text file.
     * @constant
     */
    public static readonly suggestionsPath: string = TrollBotConstants.rootPath + "suggestions.txt";
}