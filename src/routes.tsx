import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/Landing';
import MatchPage from './pages/Match';
import PlayerStatusPage from './pages/PlayerStatus';
import StartMatchPage from './pages/StartMatch';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/" component={LandingPage} />
    <Route path="/start-match" component={StartMatchPage} />
    <Route path="/player-status" component={PlayerStatusPage} />
    <Route path="/match" component={MatchPage} />
  </BrowserRouter>
);

export default Routes;
