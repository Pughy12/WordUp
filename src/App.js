import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
    createMuiTheme({
      palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }), [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
