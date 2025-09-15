import { State } from "./state.js";

export async function commandPokedex(state: State) {
    const pokemonCaught = state.pokemon.size;
    if (pokemonCaught == 0) {
        console.log("You have not caught any pokeminn :<:<:<:<:<:>:<:<");
        return;
    }
    
    console.log("LOOKIT DOSE POKEMINN");
	console.log("======POKEDEX======");
	console.log("Pokémon Caught:");
	for (const [key, p] of state.pokemon) {
		console.log(`  - ${p.name}`);
	}

};

