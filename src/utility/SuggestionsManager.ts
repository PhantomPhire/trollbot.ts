import {Collection} from "discord.js";
import {TrollBotConstants} from "../Constants";
import fs = require("fs");

/**
 * Defines the delimiter to separate suggestions in file
 * @constant
 */
const delimiter: string = "~\n";

/**
 * A static repository for holding suggestions for TrollBot
 */
export abstract class SuggestionsManager {
    /**
     * The internal collection of suggestions.
     */
    private static _suggestions: Collection<number, string> = new Collection<number, string>();

    /**
     * Initializes the suggestions repository.
     */
    public static initialize() {
        SuggestionsManager.readsuggestionsFile();
    }

    /**
     * Adds a suggestion to the file and saves the file.
     * @param suggestion The suggestions to add.
     */
    public static addsuggestion(suggestion: string): boolean | undefined {
        let listSize: number = SuggestionsManager._suggestions.size;
        for (let x: number = 0; x < listSize; x++) {
            if (suggestion.toLowerCase() == SuggestionsManager._suggestions.get(x)!.toLowerCase())
                return false;
        }
        SuggestionsManager._suggestions.set(this._suggestions.size, suggestion);
        fs.appendFileSync(TrollBotConstants.suggestionsPath, "~\n" + suggestion);
        return true;
    }

    /**
     * Removes a suggestion from the list and updates the file.
     * @param suggestion The suggestion to remove.
     */
    public static removesuggestion(suggestion: string): boolean | undefined {
        let listSize: number = SuggestionsManager._suggestions.size;
        for (let x: number = 0; x < listSize; x++) {
            if (suggestion.toLowerCase() == SuggestionsManager._suggestions.get(x)!.toLowerCase()) {
                SuggestionsManager._suggestions.delete(x);
                this.updateFile();
                return true;
            }
        }
        return false;
    }

    /**
     * Updates the suggestion file. Used when user removes entry from the list.
     */
    public static updateFile() {
        let fileString = "";
        let listSize: number = SuggestionsManager._suggestions.size;
        for (let x: number = 0; x < listSize; x++) {
            fileString = fileString + "~\n" + SuggestionsManager._suggestions.get(x);
        }
        fs.writeFileSync(TrollBotConstants.suggestionsPath, fileString);
    }

    /**
     * Gets all suggestions in the list.
     */
    public static getsuggestions(): string | undefined {
        let listSize: number = SuggestionsManager._suggestions.size;
        if (listSize > 0) {
            let stringToReturn: string = "";
            for (let x: number = 0; x < listSize; x++) {
                stringToReturn = stringToReturn + SuggestionsManager._suggestions.get(x) + "\n";
            }
            return stringToReturn;
        }
        return undefined;
    }

    /**
     * Reads in the suggestions file from memory.
     */
    private static readsuggestionsFile() {
        SuggestionsManager._suggestions.clear();

        fs.readFile(TrollBotConstants.suggestionsPath, (error, data) => {
            let suggestions = data.toString().split(delimiter);
            for (let i = 0; i < suggestions.length; i++) {
                SuggestionsManager._suggestions.set(i, suggestions[i]);
            }
        });
    }
}
