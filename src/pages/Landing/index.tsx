/* eslint-disable global-require */
import React from 'react';
import { Link } from 'react-router-dom';

import trophyImg from '../../assets/images/icons/trophy.svg';
import Logo from '../../compoenents/Logo';
import randInt from '../../tools/randInt';

import './styles.css';

const landingImgs: string[] = [
  require('../../assets/images/landing-1.svg'),
  require('../../assets/images/landing-2.svg'),
  require('../../assets/images/landing-3.svg'),
  require('../../assets/images/landing-4.svg'),
];

const Landing: React.FC = () => (
  <div id="page-landing">
    <div className="container" id="page-landing-content">
      <div className="logo-container">
        <Logo />
        <h2>Divirta-se aprendendo!</h2>
      </div>

      <img
        src={landingImgs[randInt(0, landingImgs.length)]}
        alt="Arquimat"
        className="game-image"
      />

      <div className="buttons-container">
        <Link to="/start-party" className="start-party">
          Jogar
        </Link>
        <Link to="/player-status" className="player-status">
          Estatísticas
        </Link>
      </div>

      <span className="total-wins">
        {`Total de ${0} partidas ganhas.`}
        <img src={trophyImg} alt="Troféu" />
      </span>
    </div>
  </div>
);

export default Landing;
