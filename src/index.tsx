import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root/Root';
import CssBaseline from "@material-ui/core/CssBaseline";

const Render = () => (
  <>
    <CssBaseline />
    <Root />
  </>
);

ReactDOM.render(<Render />, document.getElementById('root'));
