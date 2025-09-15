import { State } from "./state.js";

export async function commandExit(state: State) {
    console.log("Closing the Pokédex...goodbye!");
    state.rl.close();
    process.exit(0);
};