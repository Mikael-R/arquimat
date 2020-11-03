/* eslint-disable import/no-unresolved */
/* eslint-disable arrow-body-style */
import React, { ReactElement, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import warningIcon from '../../assets/icons/warning.svg';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';
import Calculation from '../../tools/Calculation';
import { convertToJsExpression } from '../../tools/convertExpression';
import convertNodeListOfToArray from '../../tools/convertNodeListOfToArray';

const Calc = new Calculation();

type TDifficulty = 'fácil' | 'médio' | 'difícil' | 'impossível' | '';

function StartParty(): ReactElement {
  const history = useHistory();

  const [preferences, setPreferences] = useState({
    totalPairs: '',
    flipTime: '',
    maxResult: '',
    highlightRevealedCards: false,
    difficulty: '' as TDifficulty,
    customExpressions: [] as string[],
  });

  function addNewCustomExpression() {
    if (preferences.totalPairs === '') {
      toast.error('Selecione o número de pares!');
      document.getElementById('total-pairs')?.focus();
    } else if (preferences.maxResult === '') {
      toast.error('Informe um valor máximo para os resultados!');
      document.getElementById('max-result')?.focus();
    } else if (
      preferences.customExpressions.length >= Number(preferences.totalPairs)
    ) {
      toast.error('O número de pares foi atingido!');
      document.getElementById('total-pairs')?.focus();
    } else if (
      preferences.customExpressions[
        preferences.customExpressions.length - 1
      ] === ''
    ) {
      convertNodeListOfToArray(document.getElementsByName('custom-expression'))
        .pop()
        .focus();
      toast.error('Preencha o campo anterior!');
    } else {
      setPreferences({
        ...preferences,
        customExpressions: [...preferences.customExpressions, ''],
      });
    }
  }

  function addNewCustomExpressionValue(position: number, value: string) {
    const customExpressionItems = preferences.customExpressions.map(
      (expression, index) => {
        const returnValue = index === position ? value : expression;
        return returnValue === '' ? '' : returnValue;
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

  function verifyPreferences(): string {
    const customExpressionElements = convertNodeListOfToArray(
      document.getElementsByName('custom-expression'),
    );

    const customExpressionElementLessThanOne = customExpressionElements.find(
      ({ value }) => {
        const calculatedResult = Calc.calculate(convertToJsExpression(value));
        return Number(calculatedResult) < Number(preferences.maxResult);
      },
    );

    const customExpressionElementInvalid = customExpressionElements.find(
      ({ value }) => {
        const calculatedResult = Calc.calculate(convertToJsExpression(value));
        if (typeof calculatedResult === 'string') {
          return true;
        }
        return false;
      },
    );

    switch (true) {
      case preferences.totalPairs === '':
        document.getElementById('total-pairs')?.focus();
        return 'Preencha todos os campos';

      case preferences.flipTime === '':
        document.getElementById('flip-time')?.focus();
        return 'Preencha todos os campos';

      case preferences.difficulty === '':
        document.getElementById('difficulty')?.focus();
        return 'Preencha todos os campos';

      case preferences.maxResult === '':
        document.getElementById('max-result')?.focus();
        return 'Preencha todos os campos';

      case !!customExpressionElementInvalid:
        customExpressionElementInvalid.focus();
        return Calc.calculate(customExpressionElementInvalid.value) as string;

      case !!customExpressionElementLessThanOne:
        customExpressionElementLessThanOne.focus();
        return `Expressão customizada tem resultado menor que o resultado máximo estabelecido(${preferences.maxResult})`;

      default:
        return '';
    }
  }

  function handleSubmit(event: FormEvent) {
    const errorMessage = verifyPreferences();

    if (errorMessage === '') history.push('/');
    else {
      toast.error(errorMessage, { bodyStyle: { whiteSpace: 'pre-line' } });
      event.preventDefault();
    }
  }

  return (
    <div className="container" id="start-party-form">
      <PageHeader
        title="Que bom que você quer jogar."
        description="Primeiramente, preencha este formulário com as suas preferências e divirta-se no seu estilo."
      />

      <main>
        <div onSubmit={handleSubmit}>
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
              name="difficulty"
              label="Dificuldade"
              options={[
                { value: 'fácil', label: 'Burro' },
                { value: 'médio', label: 'Estudante' },
                { value: 'difícil', label: 'Inteligente' },
                { value: 'impossível', label: 'Super Dotado' },
              ]}
              value={preferences.difficulty}
              onChange={({ target }) => {
                setPreferences({
                  ...preferences,
                  difficulty: target.value as TDifficulty,
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
            <CheckBox
              name="highlight-revealed-cards"
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
            <button type="submit" onClick={handleSubmit}>
              Iniciar Partida
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default StartParty;
