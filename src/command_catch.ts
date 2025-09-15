import { State } from "./state.js";

const rateMax = 356;
const rateMin = 13;

export async function commandCatch(state: State) {
    if (state.userArgs.length == 0) {
        console.log(`"explore" Usage: explore {locationAreaName}`);
        return;
    }
    const pokemonName = state.userArgs[0];
    const pokemon = await state.api.fetchPokemon(pokemonName);

    const randNum = (Math.floor(Math.random() * 100)) + 1;

	const caught = calculatePercentage(pokemon.base_experience, pokemon.weight) < randNum

    console.log(`Throwing a Pokeball at ${pokemonName}...`)
	if (caught) {
		state.pokemon.set(pokemonName, pokemon);
		console.log(`${pokemonName} caught!!`);
	} else {
		console.log(`Oooh, so close! But no ${pokemonName}...`)
	}
};

function calculatePercentage(base_experience: number, weight: number): number {
	const baseRate = (base_experience / 3) + (weight / 10 / 4)


	return 1 + ((baseRate - rateMin) * 99) / (rateMax - rateMin)
}