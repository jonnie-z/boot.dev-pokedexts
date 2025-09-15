import { ApiCache } from "./pokecache.js";

export class PokeApi {
    private static readonly baseUrl = "https://pokeapi.co/api/v2";
    private cache: ApiCache;

    constructor(cacheInterval: number) {
        this.cache = new ApiCache(cacheInterval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchPokemon(name: string): Promise<PokemonDetails> {
        const apiUrl = `${PokeApi.baseUrl}/pokemon/${name}`;

        const cached = this.cache.get<PokemonDetails>(apiUrl);
        if (cached) {
            return cached;
        }

        const apiResponse = await fetch(apiUrl);
        const apiJson = await apiResponse.json();
        const pokemon: PokemonDetails = JSON.parse(JSON.stringify(apiJson));

        this.cache.add(apiUrl, pokemon);
        return pokemon;
    }


    async fetchLocations(pageUrl?: string): Promise<LocationResponse> {
        const apiUrl = pageUrl || `${PokeApi.baseUrl}/location-area/`;

        const cached = this.cache.get<LocationResponse>(apiUrl);
        if (cached) {
            return cached;
        }

        const apiResponse = await fetch(apiUrl);
        const apiJson = await apiResponse.json();
        const locations: LocationResponse = JSON.parse(JSON.stringify(apiJson));

        this.cache.add(apiUrl, locations);
        return locations;
    }

    async fetchLocationArea(locationName: string): Promise<LocationAreaResponse> {
        const apiUrl = `${PokeApi.baseUrl}/location-area/${locationName}`;

        const cached = this.cache.get<LocationAreaResponse>(apiUrl);
        if (cached) {
            return cached;
        }

        const apiResponse = await fetch(apiUrl);
        const apiJson = await apiResponse.json();
        const locationArea: LocationAreaResponse = JSON.parse(JSON.stringify(apiJson));
        this.cache.add(apiUrl, locationArea);
        return locationArea;
    }
}


export interface LocationResponse {
    count: number
    next: string
    previous: string
    results: LocationAreaResult[]
}

export interface LocationAreaResult {
    name: string
    url: string
}


export interface LocationAreaResponse {
    name: string
    pokemon_encounters: PokemonEncounter[]
}

export interface PokemonEncounter {
    pokemon: Pokemon
}

export interface Pokemon {
    name: string
    url: string
}

export type PokemonDetails = {
  abilities: Array<{
    ability: {
      name: string
      url: string
    }
    is_hidden: boolean
    slot: number
  }>
  base_experience: number
  height: number
  held_items: Array<{
    item: {
      name: string
      url: string
    }
    version_details: Array<{
      rarity: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<{
    move: {
      name: string
      url: string
    }
    version_group_details: Array<{
      level_learned_at: number
      move_learn_method: {
        name: string
        url: string
      }
      order: any
      version_group: {
        name: string
        url: string
      }
    }>
  }>
  name: string
  order: number
  past_abilities: Array<{
    abilities: Array<{
      ability: any
      is_hidden: boolean
      slot: number
    }>
    generation: {
      name: string
      url: string
    }
  }>
  past_types: Array<any>
  species: {
    name: string
    url: string
  }
  stats: Array<{
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }>
  types: Array<{
    slot: number
    type: {
      name: string
      url: string
    }
  }>
  weight: number
}
