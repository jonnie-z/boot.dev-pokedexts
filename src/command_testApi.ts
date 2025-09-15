import { PokeApi } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandTestApi(state: State) {
    state.api.fetchLocations("");
}