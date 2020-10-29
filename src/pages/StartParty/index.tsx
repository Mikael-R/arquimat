import React, { ReactElement, useState } from 'react';

import warningIcon from '../../assets/icons/warning.svg';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

import './styles.css';

function StartParty(): ReactElement {
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ]);

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updateScheduleItems);
  }

  return (
    <div className="container" id="page-teacher-form">
      <PageHeader
        title="Que bom que você quer jogar."
        description="Primeiramente, preencha este formulário com as suas preferências e divirta-se no seu estilo."
      />

      <main>
        <form onSubmit={(e) => e.preventDefault()}>
          <fieldset>
            <legend>1</legend>
            <Input name="name" label="Nome Completo" />
          </fieldset>

          <fieldset>
            <legend>2</legend>
            <Select
              name="test-select"
              label="Apenas um teste"
              options={[{ value: 'Teste', label: 'Teste' }]}
            />
          </fieldset>

          <fieldset>
            <legend>
              3
              <button onClick={addNewScheduleItem} type="button">
                + Novo Horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div key={Number(index)} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da Semana"
                  value={scheduleItem.week_day}
                  onChange={(e) => {
                    setScheduleItemValue(index, 'week_day', e.target.value);
                  }}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-feira' },
                    { value: '2', label: 'Terça-feira' },
                    { value: '3', label: 'Quarta-feira' },
                    { value: '4', label: 'Quinta-feira' },
                    { value: '5', label: 'Sexta-feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                />

                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={(e) => {
                    setScheduleItemValue(index, 'from', e.target.value);
                  }}
                />

                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={(e) => {
                    setScheduleItemValue(index, 'to', e.target.value);
                  }}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante!
              <br />
              Preencha todos os dados.
            </p>
            <button type="submit">Iniciar Partida</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default StartParty;
