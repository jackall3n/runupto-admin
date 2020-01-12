import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from "../../App";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { Provider } from 'react-redux';
import configureStore from "../../store/configureStore";
import { MenuProvider } from "../../contexts/MenuContext";

const store = configureStore();

export default function Root() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Router>
            <App />
          </Router>
        </MuiPickersUtilsProvider>
      </MenuProvider>
    </Provider>
  )
}
