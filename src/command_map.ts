import { State } from "./state.js";

export async function commandMap(state: State) {
    const locations = await state.api.fetchLocations(state.nextLocationsUrl);

    state.nextLocationsUrl = locations.next;
    state.previousLocationsUrl = locations.previous;

    for (const location of locations.results) {
        console.log(location.name);
    }
};

export async function commandMapb(state: State) {
    if (!state.previousLocationsUrl) {
        console.log("You are on the first page");
        return;
    }

    const locations = await state.api.fetchLocations(state.previousLocationsUrl);

    state.nextLocationsUrl = locations.next;
    state.previousLocationsUrl = locations.previous;

    for (const location of locations.results) {
        console.log(location.name);
    }
};

export async function commandExplore(state: State) {
    if (state.userArgs.length == 0) {
        console.log(`"explore" Usage: explore {locationAreaName}`);
        return;
    }
    const locationAreaName = state.userArgs[0];
    const locationArea = await state.api.fetchLocationArea(locationAreaName);

    console.log(`Pokémon in ${locationAreaName}:`);
    for (const pokemonEncounter of locationArea.pokemon_encounters) {
        console.log(`  * ${pokemonEncounter.pokemon.name}`);
    }
}