import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import landing1Img from '../../assets/landing-1.svg';
import landing2Img from '../../assets/landing-2.svg';
import landing3Img from '../../assets/landing-3.svg';
import landing4Img from '../../assets/landing-4.svg';
import landing5Img from '../../assets/landing-5.svg';
import randInt from '../../tools/randInt';

import './styles.css';

const landingImages: string[] = [
  landing1Img,
  landing2Img,
  landing3Img,
  landing4Img,
  landing5Img
];

function Landing(): ReactElement {
  return (
    <div id="page-landing">
      <div className="container" id="page-landing-content">
        <div className="logo-container">
          <div id="logo">Arquimat</div>
          <h2>Divirta-se aprendendo!</h2>
        </div>

        <img
          src={landingImages[randInt(0, landingImages.length)]}
          alt="Arquimat"
          className="game-image"
        />

        <div className="buttons-container">
          <Link to="/start-match" className="start-match">
            &#x1F3AE; Jogar
          </Link>
          <Link to="/player-status" className="player-status">
            &#x1F4D6; Estatísticas
          </Link>
        </div>

        <span className="total-wins">
          Total de
          {` ${localStorage.getItem('wins') || 0} `}
          partidas ganhas. &#x1F3C6;
        </span>
      </div>
    </div>
  );
}

export default Landing;
