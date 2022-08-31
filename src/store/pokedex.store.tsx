import { createStore, createSubscriber, createHook, defaultRegistry } from 'react-sweet-state';
import {Pokemon, Result} from '../types/pokemon.types';
import axios from 'axios';

// const result = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=20`);
// const pokemon = await result.data.results;

const Store = createStore({
  initialState: {
    savedPokemon: [],
    searchedPokemon: [],
    initialPokemon: {
      results: [],
      count: undefined
    },
    pageOffset: 0
  },
  actions: {
    nextPage: (page: number) => ({ setState, getState }: any) => {
      setState({
        pageOffset: getState().pageOffset + 20
      });
    },
    prevPage: (page: number) => ({ setState, getState }: any) => {
      setState({
        pageOffset: getState().pageOffset > 0 ? getState().pageOffset - 20 : null
      });
    },
    addPokemon: (pokemon: Pokemon) => ({ setState, getState }: any) => {
      setState({
        savedPokemon: [...getState().savedPokemon, pokemon]
      });
    },
    removePokemon: (pokemon: Pokemon) => ({ setState, getState }: any) => {
      setState({
        savedPokemon: getState().savedPokemon.filter((el: Pokemon) => { return el.id != pokemon.id })
      });
    },
    fetchPokemon: (pokemonPage: number) => async ({ setState }: any) => {
      const result: Result = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/?offset=${pokemonPage}&limit=20`)
      const pokemon = result.data;
      setState({
        initialPokemon: pokemon
      });
    },
    searchAllPokemon: (searchTerm: string) => async ({ setState }: any) => {
      const result: Result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      const pokemon = searchTerm !== "" ? result.data.results.filter(word => word.name.toLowerCase().indexOf(searchTerm) > -1).splice(0, 20) : [];
      setState({
        searchedPokemon: pokemon
      });
    },
  },
});

export const CounterSubscriber = createSubscriber(Store);

const usePoke = createHook(Store);

export const getCounterStore = () => defaultRegistry.getStore(Store);

export {usePoke, Store}; // export store variable here