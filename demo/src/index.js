import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';
import {
  createStore,
} from 'redux';
import {
  Provider as ReduxProvider,
} from 'react-redux';
import reducer from '~/modules/reducer';
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import * as MuiColor from '@material-ui/core/colors';
import App from './App';
//import reportWebVitals from './reportWebVitals';

const store = createStore(reducer);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: MuiColor.yellow[500],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider
      store={store}
    >
      <ThemeProvider
        theme={theme}
      >
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
