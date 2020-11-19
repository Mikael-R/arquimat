/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { ReactElement, useState, useEffect } from 'react';

import rocketIcon from '../../assets/icons/rocket.svg';
import smileIcon from '../../assets/icons/smile.svg';
import PageHeader from '../../components/PageHeader';
import playerStatus from '../../repository/player-status';
import Calculation from '../../tools/Calculation';
import {
  convertToJsExpression,
  convertToMathExpression
} from '../../tools/convertExpression';
import generateCardsContent from '../../tools/generateCardsContent';
import randInt from '../../tools/randInt';
import { IPreferences } from '../../types';
import winModal from './WinModal';

import './styles.css';

const Calc = new Calculation();

const cardFrontFaceIcons = [rocketIcon, smileIcon];
const cardFrontFaceIcon =
  cardFrontFaceIcons[randInt(0, cardFrontFaceIcons.length)];

function Match(): ReactElement {
  const [showWinModal, setShowWinModal] = useState(false);

  const searchParams = new URLSearchParams(window.location.search);
  const {
    highlightRevealedCards = false,
    flipTime = '',
    totalPairs = '2',
    customExpressions = [],
    operators = ['+'],
    maxResult = '100',
    minResult = '10'
  }: IPreferences = JSON.parse(searchParams.get('preferences') || '{}');

  const cardsContent = generateCardsContent({
    minResult,
    maxResult,
    totalPairs,
    operators,
    customExpressions: customExpressions.map(exp => convertToJsExpression(exp)),
    sortArray: true,
    customReturn: expressionOrResult =>
      convertToMathExpression(expressionOrResult)
  });

  const matchedCards: HTMLDivElement[] = [];

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard: HTMLDivElement | null = null;
  let secondCard: HTMLDivElement | null = null;
  let matchLastFlip = false;
  let hits = 0;

  const flipCard = (card: EventTarget & HTMLDivElement, cardID: number) => {
    if (lockBoard) return;
    if (card === firstCard) return;
    if (matchedCards.includes(card)) return;

    const cardSpan = card.children[0];
    (cardSpan as HTMLSpanElement).innerText = convertToMathExpression(
      cardsContent[cardID]
    );
    card.classList.add('flip');

    if (highlightRevealedCards) card.style.border = 'solid yellow';
    if (Number(flipTime) > 0) unflipCardByTimeout(card, Number(flipTime));
    playerStatus.setCardsRevealed();

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = card;
      return;
    }

    secondCard = card;

    checkForMatch();
  };

  const unflipCardByTimeout = (
    card: HTMLDivElement,
    timeoutInSeconds: number
  ) => {
    setTimeout(() => {
      if (!matchedCards.includes(card)) card.classList.remove('flip');
    }, timeoutInSeconds * 1000);
  };

  const checkForMatch = () => {
    const isMatch =
      Calc.calculate(
        convertToJsExpression(firstCard?.children[0].innerHTML || '')
      ) ===
      Calc.calculate(
        convertToJsExpression(secondCard?.children[0].innerHTML || '')
      );

    if (isMatch) {
      if (matchLastFlip) hits += 1;
      matchLastFlip = true;

      playerStatus.setStraightHits(hits);
      disableCards();
    } else {
      matchLastFlip = false;

      unflipCards();
    }
  };

  const disableCards = () => {
    if (firstCard && secondCard) {
      firstCard.classList.add('flip');
      secondCard.classList.add('flip');

      matchedCards.push(firstCard, secondCard);
    }

    resetBoard();
  };

  const unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
      firstCard?.classList.remove('flip');
      secondCard?.classList.remove('flip');

      resetBoard();
    }, 1500);
  };

  const resetBoard = () => {
    const cardsSpan = [
      firstCard?.children[0] as HTMLSpanElement,
      secondCard?.children[0] as HTMLSpanElement
    ];

    if (!matchedCards.includes(firstCard as HTMLDivElement)) {
      setTimeout(() => {
        cardsSpan[0].innerText = '';
        cardsSpan[1].innerText = '';
      }, 500);
    }

    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    const isWin = Number(totalPairs) * 2 === matchedCards.length;

    if (isWin) onWin();
  };

  const onWin = () => {
    setTimeout(() => setShowWinModal(true), 1500);
    playerStatus.setWins();
    playerStatus.setCameInLastMatch();
  };

  useEffect(() => {
    setTimeout(() => {
      const lastCustomExpression =
        customExpressions[customExpressions.length - 1];

      playerStatus.setTotalMatches();
      playerStatus.setCameInLastMatch();
      lastCustomExpression &&
        playerStatus.setLastCustomExpression(lastCustomExpression);

      setInterval(
        () => playerStatus.setTimeSpentOnAllMatchesInSeconds(5),
        5000
      );
    }, 10000);
  });

  return (
    <div
      className="container"
      id="page-match"
      style={{ overflow: showWinModal ? 'hidden' : 'auto' }}
    >
      <PageHeader hideBackButton title="" />

      <main>
        <div className="memory-game">
          {cardsContent.map((_, index) => (
            <div
              key={String(index)}
              className="memory-card"
              onClick={({ currentTarget }) => flipCard(currentTarget, index)}
            >
              <span className="front-face" />
              <img className="back-face" src={cardFrontFaceIcon} alt="Emoji" />
            </div>
          ))}
        </div>
      </main>

      {winModal({ isOpen: showWinModal })}
    </div>
  );
}

export default Match;
