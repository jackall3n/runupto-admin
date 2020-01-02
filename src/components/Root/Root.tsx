import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from "../../App";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, } from '@material-ui/pickers';

export default function Root() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Router>
        <App />
      </Router>
    </MuiPickersUtilsProvider>
  )
}
