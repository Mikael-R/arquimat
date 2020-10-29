import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/Landing';
import PlayerStatusPage from './pages/PlayerStatus';
import StartPartyPage from './pages/StartParty';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/" component={LandingPage} />
    <Route path="/start-party" component={StartPartyPage} />
    <Route path="/player-status" component={PlayerStatusPage} />
  </BrowserRouter>
);

export default Routes;
