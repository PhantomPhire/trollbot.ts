/**
 * A "stringify" able struct for the troll's roasts
 */
export class RoastsSaveState {
    /**
     * The id of the guild the roats are for
     */
    public GuildId: string;

    /**
     * The the roasts to use
     */
    public Roasts: Array<string>;

    /**
     * Constructs a new instance of the RoastsSaveState class
     * @param guildId The id of the guild the roats are for
     * @param roasts The the roasts to use
     */
    constructor(guildId: string, roasts: Array<string>) {
        this.GuildId = guildId;
        this.Roasts = roasts;
    }
}