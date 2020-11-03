/* eslint-disable operator-linebreak */
import React, { ReactElement } from 'react';

import LabelKeyValue from '../../components/LabelKeyValue';
import PageHeader from '../../components/PageHeader';
import timeSince from '../../tools/timeSince';

import './styles.css';

function PlayerStatus(): ReactElement {
  const cameInLastMatchAsMilliseconds = Number(
    localStorage.getItem('cameInLastMatchAsMilliseconds'),
  );

  const wins = Number(localStorage.getItem('wins')) || 0;

  const totalMatches = Number(localStorage.getItem('totalMatches')) || 0;

  const cardsRevealed = localStorage.getItem('cardsRevealed') || 0;

  const straightHits = localStorage.getItem('straightHits') || 0;

  const probabilityOfVictory =
    totalMatches !== 0 ? ((wins / totalMatches) * 100).toFixed(0) : 0;

  const timeSpentOnAllMatchesInSeconds =
    Number(localStorage.getItem('timeSpentOnAllMatchesInSeconds')) || 0;

  const averageMatchDurationInSeconds = timeSpentOnAllMatchesInSeconds
    ? Number((totalMatches / timeSpentOnAllMatchesInSeconds).toFixed(0))
    : 0;

  const lastCustomExpression =
    localStorage.getItem('lastCustomExpression') || 'nenhuma';

  const cameInLastMatch = cameInLastMatchAsMilliseconds
    ? new Date(cameInLastMatchAsMilliseconds)
    : null;

  return (
    <div className="container" id="page-player-status">
      <PageHeader
        title="Estas são as suas estatísticas."
        description="Jogue mais partidas para conseguir o máximo de informações possíveis."
      />

      <main>
        <fieldset>
          <legend>Estatísticas</legend>
          <LabelKeyValue title="Vitórias" value={wins} />
          <LabelKeyValue title="Partidas jogadas" value={totalMatches} />
          <LabelKeyValue title="Cards revelados" value={cardsRevealed} />
          <LabelKeyValue title="Acertos seguidos" value={straightHits} />
          <LabelKeyValue
            title="Probabilidade de vitória"
            value={`${probabilityOfVictory}%`}
          />
          <LabelKeyValue
            title="Tempo jogado (todas as partidas)"
            value={timeSince(timeSpentOnAllMatchesInSeconds)}
          />
          <LabelKeyValue
            title="Duração média das partidas"
            value={timeSince(averageMatchDurationInSeconds)}
          />
          <LabelKeyValue
            title="Última conta customizada"
            value={lastCustomExpression}
          />
          {cameInLastMatch !== null && (
            <LabelKeyValue
              title="Jogou por último há"
              value={`${timeSince(cameInLastMatch)} atrás`}
            />
          )}
        </fieldset>

        <footer>
          <p>
            Feito com &#x1F49C; por
            <a href="https://mikael-r.github.io/contact/">Mikael</a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default PlayerStatus;
