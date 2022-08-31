import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline';
import {styled} from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const StyledContainer = styled(Container)`
  background-color: #eee;
  padding: 1em;
  box-shadow: 0px 0px 19px 14px rgb(0 0 0 / 5%);
  border-left: 1px solid #ffffff;
  border-right: 1px solid #ffffff;
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <StyledContainer maxWidth='lg'>
      <Box>
        <App />
      </Box>
    </StyledContainer>
  </React.StrictMode>
)
