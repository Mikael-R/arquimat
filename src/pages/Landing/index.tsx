import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import trophyImg from '../../assets/icons/trophy.svg';
import landing1Img from '../../assets/landing-1.svg';
import landing2Img from '../../assets/landing-2.svg';
import landing3Img from '../../assets/landing-3.svg';
import landing4Img from '../../assets/landing-4.svg';
import landing5Img from '../../assets/landing-5.svg';
import randInt from '../../tools/randInt';

import './styles.css';

const landingImgs: string[] = [
  landing1Img,
  landing2Img,
  landing3Img,
  landing4Img,
  landing5Img,
];

sessionStorage.setItem(
  'landingImgURL',
  landingImgs[randInt(0, landingImgs.length)],
);

function Landing(): ReactElement {
  return (
    <div id="page-landing">
      <div className="container" id="page-landing-content">
        <div className="logo-container">
          <div id="logo">Arquimat</div>
          <h2>Divirta-se aprendendo!</h2>
        </div>

        <img
          width="360"
          height="260"
          src={sessionStorage.getItem('landingImgURL') as string}
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
          Total de
          {` ${0} `}
          partidas ganhas.
          <img src={trophyImg} alt="Troféu" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
