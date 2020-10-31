import React, { ReactElement, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import warningIcon from '../../assets/icons/warning.svg';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

type TDificulty = 'easy' | 'medium' | 'hard' | 'impossible' | '';

function StartParty(): ReactElement {
  const history = useHistory();

  const [preferences, setPreferences] = useState({
    totalPairs: '',
    flipTime: '',
    maxResult: '50',
    highlightRevealedCards: false,
    dificulty: '' as TDificulty,
    customExpressions: [] as string[],
  });

  function addNewCustomExpression() {
    if (preferences.totalPairs === '') {
      toast.error('Selecione o número de pares!');
    } else if (
      preferences.customExpressions.length >= Number(preferences.totalPairs)
    ) {
      toast.error('O número de pares foi atingido!');
    } else if (
      preferences.customExpressions[
        preferences.customExpressions.length - 1
      ] === '0'
    ) {
      toast.error('Preencha o campo anterior!');
    } else {
      setPreferences({
        ...preferences,
        customExpressions: [...preferences.customExpressions, '0'],
      });
    }
  }

  function addNewCustomExpressionValue(position: number, value: string) {
    const customExpressionItems = preferences.customExpressions.map(
      (expression, index) => {
        const returnValue = index === position ? value : expression;
        return returnValue === '' ? '0' : returnValue;
      },
    );

    setPreferences({
      ...preferences,
      customExpressions: customExpressionItems,
    });
  }

  function customExpressionsByTotalPairs(totalPairs: number) {
    const customExpressionItems = preferences.customExpressions.filter(
      (_, index) => index < totalPairs,
    );

    return customExpressionItems;
  }

  function verifyPreferences() {
    switch (true) {
      case preferences.totalPairs === '':
        document.getElementById('total-pairs')?.scrollIntoView();
        document.getElementById('total-pairs')?.focus();
        break;

      case preferences.flipTime === '':
        document.getElementById('flip-time')?.scrollIntoView();
        document.getElementById('flip-time')?.focus();
        break;

      case preferences.dificulty === '':
        document.getElementById('dificulty')?.scrollIntoView();
        document.getElementById('dificulty')?.focus();
        break;

      case preferences.maxResult === '':
        document.getElementById('max-result')?.scrollIntoView();
        document.getElementById('max-result')?.focus();
        break;

      default:
        return true;
    }
    toast.error('Preencha todos os campos');
    return false;
  }

  function handleSubmit(event: FormEvent) {
    const passed = verifyPreferences();

    if (passed) history.push('/');
    else event.preventDefault();
  }

  return (
    <div className="container" id="start-party-form">
      <PageHeader
        title="Que bom que você quer jogar."
        description="Primeiramente, preencha este formulário com as suas preferências e divirta-se no seu estilo."
      />

      <main>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Regras de jogo</legend>
            <Select
              name="total-pairs"
              label="Número de pares"
              options={[
                { value: '3', label: '3 pares' },
                { value: '4', label: '4 pares' },
                { value: '5', label: '5 pares' },
                { value: '6', label: '6 pares' },
                { value: '7', label: '7 pares' },
                { value: '8', label: '8 pares' },
              ]}
              value={preferences.totalPairs}
              onChange={({ target }) => {
                setPreferences({
                  ...preferences,
                  totalPairs: target.value,
                  customExpressions: customExpressionsByTotalPairs(
                    Number(target.value),
                  ),
                });
              }}
            />
            <Select
              name="flip-time"
              label="Tempo de visualização"
              options={[
                { value: '4', label: '4 segundos' },
                { value: '5', label: '5 segundos' },
                { value: '6', label: '6 segundos' },
                { value: '7', label: '7 segundos' },
                { value: '8', label: '8 segundos' },
                { value: '9', label: '9 segundos' },
                { value: '10', label: '10 segundos' },
              ]}
              value={preferences.flipTime}
              onChange={({ target }) => {
                setPreferences({ ...preferences, flipTime: target.value });
              }}
            />
            <Select
              name="dificulty"
              label="Dificuldade"
              options={[
                { value: 'easy', label: 'Burro' },
                { value: 'medium', label: 'Estudante' },
                { value: 'hard', label: 'Inteligente' },
                { value: 'impossible', label: 'Super Dotado' },
              ]}
              value={preferences.dificulty}
              onChange={({ target }) => {
                setPreferences({
                  ...preferences,
                  dificulty: target.value as TDificulty,
                });
              }}
            />
            <Input
              shouldBreakLineBetweenLabelAndInput
              name="max-result"
              type="number"
              min="1"
              max="99"
              label="Valor máximo de resultado"
              value={preferences.maxResult}
              onFocus={() => {
                if (preferences.maxResult === '') {
                  toast.info(
                    'O resultado das expressões customizadas não são afetadas por este resultado!',
                  );
                }
              }}
              onChange={({ target }) => {
                if (Number(target.value) > 99 || Number(target.value) < 1) {
                  toast.warn('Use números maiores que 0 e menores que 100!');
                } else {
                  setPreferences({ ...preferences, maxResult: target.value });
                }
              }}
            />
            <Input
              name="highlight-revealed-cards"
              type="checkbox"
              label="Destacar cards revelados"
              value={preferences.highlightRevealedCards === true ? 1 : 0}
              onChange={() => {
                setPreferences({
                  ...preferences,
                  highlightRevealedCards: !preferences.highlightRevealedCards,
                });
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Expressões customizadas
              <button onClick={addNewCustomExpression} type="button">
                + Expressão
              </button>
            </legend>
            {preferences.customExpressions.map((expression, index) => (
              <div key={Number(index)} className="expression-item">
                <Input
                  shouldBreakLineBetweenLabelAndInput
                  name="custom-expression"
                  label={`Expressão ${Number(index) + 1}`}
                  value={expression}
                  onChange={({ target }) => {
                    addNewCustomExpressionValue(index, target.value);
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
          <ToastContainer />
        </form>
      </main>
    </div>
  );
}

export default StartParty;
