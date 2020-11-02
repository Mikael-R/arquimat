/* eslint-disable operator-linebreak */
import React, { ReactElement } from 'react';

import purpleHeartIcon from '../../assets/icons/purple-heart.svg';
import LabelKeyValue from '../../components/LabelKeyValue';
import PageHeader from '../../components/PageHeader';

import './styles.css';

function PlayerStatus(): ReactElement {
  const playerAnalytics = {
    wins: 2,
    totalParties: 2,
    dificultyMostUsed: 'fácil',
    lastCustomAccount: '2x2',
    cameInLast: 'hoje',
    timeSpentOnAllPartiesInSeconds: 60,
    straightHits: '2',
    cardsRevealed: '20',
  };

  return (
    <div className="container" id="page-player-status">
      <PageHeader
        title="Estas são as suas estatísticas."
        description="Jogue mais partidas para conseguir o máximo de informações possíveis."
      />

      <main>
        <fieldset>
          <legend>Estatísticas</legend>
          <LabelKeyValue title="Vitórias" value={playerAnalytics.wins} />
          <LabelKeyValue
            title="Partidas jogadas"
            value={playerAnalytics.totalParties}
          />
          <LabelKeyValue
            title="Cards revelados"
            value={playerAnalytics.cardsRevealed}
          />
          <LabelKeyValue
            title="Acertos seguidos"
            value={playerAnalytics.straightHits}
          />
          <LabelKeyValue
            title="Probabilidade de vitória"
            value={`${(
              (playerAnalytics.wins / playerAnalytics.totalParties) *
              100
            ).toFixed(0)}%`}
          />
          <LabelKeyValue
            title="Dificuldade mais jogada"
            value={playerAnalytics.dificultyMostUsed}
          />

          <LabelKeyValue
            title="Duração média de partida"
            value={`${(
              playerAnalytics.timeSpentOnAllPartiesInSeconds /
              playerAnalytics.totalParties
            ).toFixed(0)} segundos`}
          />

          <LabelKeyValue
            title="Última conta customizada"
            value={playerAnalytics.lastCustomAccount}
          />
          <LabelKeyValue
            title="Entrou por último"
            value={playerAnalytics.cameInLast}
          />
        </fieldset>

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
