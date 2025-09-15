import { State } from "./state.js";

export async function commandHelp(state: State) {
    console.log("Welcome to the Pokédex!")
    console.log();
    console.log("Usage:");
    for (const command of Object.values(state.commands)) {
        console.log(`${command.name}: ${command.description}`);
    }
};