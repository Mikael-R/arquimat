import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LandingPage from './pages/Landing';
import PlayerStatusPage from './pages/PlayerStatus';
import SearchPartyPage from './pages/SearchParty';

const Routes: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/" component={LandingPage} />
    <Route path="/search-party" component={SearchPartyPage} />
    <Route path="/player-status" component={PlayerStatusPage} />
  </BrowserRouter>
);

export default Routes;
