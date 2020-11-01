import React, { ReactElement } from 'react';

import purpleHeartIcon from '../../assets/icons/purple-heart.svg';
import LabelKeyValue from '../../components/LabelKeyValue';
import PageHeader from '../../components/PageHeader';

import './styles.css';

function PlayerStatus(): ReactElement {
  return (
    <div className="container" id="page-player-status">
      <PageHeader
        title="Estas são as suas estatísticas."
        description="Jogue mais partidas para conseguir o máximo de informações possíveis."
      />

      <main>
        <fieldset>
          <legend>Estatísticas</legend>
          <LabelKeyValue title="Vitórias" value="2" />
          <LabelKeyValue title="Partidas jogadas" value="2" />
          <LabelKeyValue title="Probabilidade de vitória" value="2%" />
          <LabelKeyValue title="Dificuldade mais jogada" value="fácil" />
          <LabelKeyValue title="Última conta customizada" value="2" />
          <LabelKeyValue title="Entrou por último" value="hoje" />
          <LabelKeyValue title="Duração média de partida" value="1 minuto" />
          <LabelKeyValue title="Acertos seguidos" value="3" />
          <LabelKeyValue title="Cards revelados" value="3" />
          <LabelKeyValue title="Pares formados" value="3" />
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
