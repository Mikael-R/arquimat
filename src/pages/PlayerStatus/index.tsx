import React, { ReactElement } from 'react';

import purpleHeartIcon from '../../assets/icons/purple-heart.svg';
import PageHeader from '../../components/PageHeader';

import './styles.css';

function PlayerStatus(): ReactElement {
  return (
    <div className="container" id="page-player-status">
      <PageHeader title="Estas são as suas estatísticas." />

      <main>
        <p>Vitórias</p>
        <hr />
        <p>Partidas jogadas</p>
        <hr />
        <p>Índice de vitórias (vitórias/partidas)</p>
        <hr />
        <p>Dificuldade mais jogada</p>
        <hr />
        <p>Últimas 4 contas customizadas</p>
        <hr />
        <p>Entrou por último</p>
        <hr />
        <p>Média de duração de uma partida</p>
        <hr />
        <p>Acertos seguidos</p>
        <hr />
        <p>Cards revelados</p>
        <hr />
        <p>Pares formados</p>

        <footer>
          <p>
            Feito com
            <img src={purpleHeartIcon} alt="Coração roxo" />
            por
            <a href="https://mikael-r.github.io/contact/">Mikael</a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default PlayerStatus;
