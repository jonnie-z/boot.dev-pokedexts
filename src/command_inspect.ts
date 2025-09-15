import { State } from "./state.js";

export async function commandInspect(state: State) {
    if (state.userArgs.length == 0) {
        console.log(`"explore" Usage: explore {locationAreaName}`);
        return;
    }
    const pokemonName = state.userArgs[0];
    const pokemon = state.pokemon.get(pokemonName);
    if (pokemon == undefined) {
        console.log(`You have not caught a ~~~${pokemonName}~~~...`);
        return;
    }

    console.log(`LOOKIT DAT ${pokemonName}`);
    console.log(`=========${pokemon.name}=========`)
	console.log(`Name: ${pokemon.name}`)
	console.log(`Height: ${pokemon.height}`)
	console.log(`Weight: ${pokemon.weight}`)
	console.log("Stats:")
    for (const stat of pokemon.stats) {
		console.log(`  - ${stat.stat.name}: ${stat.base_stat}`)
	}
	console.log("Types:")
	for (const type of pokemon.types) {
		console.log(`  - ${type.type.name}`)
	}
	console.log(`==========${pokemon.name}=========`)

};

