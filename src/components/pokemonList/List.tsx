import Card from './Card';
import {ImageList} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {usePoke} from '../../store/pokedex.store';

export default function List() {
  const [pokemon, setPokemon] = useState([]);
  const [state, actions] = usePoke();
  const currentPokemon = state.searchedPokemon.length > 0 ? state.searchedPokemon : state.initialPokemon.results;

  useEffect(() => {
    // @ts-ignore
    actions.fetchPokemon(0);
  }, []);

  const theme = useTheme();
  // useMediaQuery handles the breakpoint size, if it's
  // small, we use 1 column, if it's a larger width, we use 3
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const md = useMediaQuery(theme.breakpoints.up('md'));

  console.log(state.searchedPokemon, state.searchedPokemon.length)

  return (
    <ImageList cols={!sm ? 1 : !md ? 2 : 3} gap={30}>
      {currentPokemon?.map((item: any) => {
        const pokemonNum = item.url && item.url.split('/')[item.url.split('/').length - 2];
        const itemData = {...item, indexNum: pokemonNum};
        return (
          <Card key={pokemonNum} item={itemData} />
        );
      })}
    </ImageList>
  );
}