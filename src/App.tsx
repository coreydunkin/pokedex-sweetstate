import List from './components/pokemonList/List';
import PaginationControl from './components/PaginationControl';
import Search from './components/search/Search';
import {Grid} from '@mui/material';
import {usePoke} from './store/pokedex.store';

function App() {
  const [state, actions] = usePoke();

  return (
    <>
      <h1>SWEET-STATE POKEDEX 😎</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Search />
        </Grid>
        <Grid item xs={12} md={4}>
          {state.searchedPokemon.length == 0 && <PaginationControl />}
        </Grid>
      </Grid>
      <List />

    </>
  )
}

export default App
