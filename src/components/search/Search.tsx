import React, {useState, useContext, useEffect} from 'react';
import {Paper} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import {usePoke} from '../../store/pokedex.store';

export default function Search() {
  const [ searchValue, setSearchValue] = useState('');
  const [state, actions] = usePoke();

  // Clear out the search and reset the pagination
  function handleClear() {
    setSearchValue('');
  }

  // When we come back to the home page, where search is available, retain the search field
  useEffect(() => {
    searchValue !== null && setSearchValue(searchValue);
    searchValue.length > 0 ? actions.searchAllPokemon(searchValue) : actions.searchAllPokemon("");
  }, [searchValue]);

  return (
    <>
      <Paper
        component='form'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', maxWidth: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          value={searchValue}
          placeholder='Search for pokemon'
          inputProps={{ 'aria-label': 'Search for images' }}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        {searchValue !== null && searchValue.length > 0 && (
          <IconButton
            sx={{ p: '10px' }}
            aria-label='clear'
            onClick={handleClear}
          >
            <ClearIcon  />
          </IconButton>
        )}
      </Paper>
    </>
  );
}
