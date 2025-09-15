import { stdin, stdout } from "process";
import { createInterface, type Interface } from "readline";

import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandPokedex } from "./command_pokedex.js";
import { commandInspect } from "./command_inspect.js";
import { commandTestApi } from "./command_testApi.js";
import { commandCatch } from "./command_catch.js";
import { PokeApi, PokemonDetails } from "./pokeapi.js";
import { commandMap, commandMapb, commandExplore } from "./command_map.js";

export type State = {
    rl: Interface,
    commands: Record<string, CLICommand>,
    api: PokeApi,
    userArgs: string[],
    nextLocationsUrl: string,
    previousLocationsUrl: string,
    pokemon: Map<string, PokemonDetails>
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
}

export function initState(cacheInterval: number) {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        prompt: "Pokédex > ",
    });

    const commands = getCommands();

    const state: State = {
        rl,
        commands,
        api: new PokeApi(cacheInterval),
        userArgs: [],
        nextLocationsUrl: "",
        previousLocationsUrl: "",
        pokemon: new Map<string, PokemonDetails>(),
    }

    return state;
}

function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "exits the Pokédex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "calls the Help command",
            callback: commandHelp,
        },
        testapi: {
            name: "testapi",
            description: "DEV ONLY",
            callback: commandTestApi,
        },
        map: {
            name: "map",
            description: "show location areas",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "show previous location areas",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "show Pokémon in Location Area",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "catch dat porkeminn!",
            callback: commandCatch,
        },
        pokedex: {
            name: "pokedex",
            description: "lookit dose porkeminn!",
            callback: commandPokedex,
        },
        inspect: {
            name: "inspect",
            description: "lookit dat porkeminn!",
            callback: commandInspect,
        },
    };
}