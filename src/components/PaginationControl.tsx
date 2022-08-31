import Card from './Card';
import {ImageList, Pagination} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {usePoke} from '../store/pokedex.store';

export default function PaginationControl() {
  const [state, actions] = usePoke();


  const theme = useTheme();
  // useMediaQuery handles the breakpoint size, if it's
  // small, we use 1 column, if it's a larger width, we use 3
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  console.log(state)

  function handleChange(page: number) {
    console.log(page)
    actions.fetchPokemon(20 * (page - 1))
  }

  return (
    <Pagination count={Math.round(state.initialPokemon.count / 20)} onChange={(event, page) => handleChange(page)} />
  );
}