import {TrollBotManager} from "./TrollBotManager";

setup();

/**
 * Sets up bot functionality.
 */
function setup() {
    const botManager = new TrollBotManager();
    botManager.run();
}
