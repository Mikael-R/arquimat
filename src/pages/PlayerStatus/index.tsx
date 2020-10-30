import React, { ReactElement } from 'react';

import PageHeader from '../../components/PageHeader';

import './styles.css';

function PlayerStatus(): ReactElement {
  return (
    <div className="container" id="page-player-status">
      <PageHeader title="Estas são as suas estatísticas." />

      <main>
        <p>Vitórias</p>
        <p>Partidas jogadas</p>
        <p>Índice de vitórias (vitórias/partidas)</p>
        <p>Dificuldade mais jogada</p>
        <p>Últimas 4 contas customizadas</p>
        <p>Entrou por último</p>
        <p>Média de duração de uma partida</p>
        <p>Acertos seguidos</p>
        <p>Cards revelados</p>
        <p>Pares formados</p>
      </main>
    </div>
  );
}

export default PlayerStatus;
