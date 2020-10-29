import React from 'react';
import { Link } from 'react-router-dom';

import trophyImg from '../../assets/images/icons/trophy.png';
import landingImg from '../../assets/images/landing.svg';
import logoImg from '../../assets/images/logo.png';

import './styles.css';

const Landing: React.FC = () => (
  <div id="page-landing">
    <div className="container" id="page-landing-content">
      <div className="logo-container">
        <img width="240" height="144" src={logoImg} alt="logo" />
        <h2>Se divirta aprendendo!</h2>
      </div>

      <img src={landingImg} alt="Arquimat" className="game-image" />

      <div className="buttons-container">
        <Link to="/search-party" className="search-party">
          Iniciar Partida
        </Link>
        <Link to="/player-status" className="player-status">
          Ver Estatísticas
        </Link>
      </div>

      <span className="total-wins">
        {`Total de ${0} partidas ganhas.`}
        <img width="16" src={trophyImg} alt="Troféu" />
      </span>
    </div>
  </div>
);

export default Landing;
