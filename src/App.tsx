import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './features/component/header/header';
import Footer from './features/component/footer/footer';
import Home from './features/pages/home/home';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#002a5e',
    },
  },
});

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Home />
        <Footer />
      </ThemeProvider>
    </div>
  );
}


export default App;
