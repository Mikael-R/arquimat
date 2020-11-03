import React, { ReactElement } from 'react';

import './styles/global.css';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';

const App = (): ReactElement => (
  <>
    <ToastContainer />
    <Routes />
  </>
);

export default App;
