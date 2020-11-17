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

const searchParams = new URLSearchParams(window.location.search);
const {
  highlightRevealedCards = false,
  flipTime = '',
  totalPairs = '3',
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

const cardsDisable: HTMLDivElement[] = [];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard: HTMLDivElement | null = null;
let secondCard: HTMLDivElement | null = null;
let matchLastFlip = false;
let hits = 0;

function Match(): ReactElement {
  const [showWinModal, setShowWinModal] = useState(false);
  const [currentCardsText, setCurrentCardsText] = useState<{
    [cardID: string]: string;
  }>({});

  const flipCard = (target: HTMLDivElement | null) => {
    if (lockBoard) return;
    if (target === firstCard || target === null) return;
    if (cardsDisable.includes(target)) return;

    setCurrentCardsText({
      ...currentCardsText,
      [target.id]: cardsContent[Number(target.id)]
    });

    target?.classList.add('flip');

    if (highlightRevealedCards) target.style.border = 'solid yellow';
    if (Number(flipTime) > 0) unflipCardByTimeout(target, Number(flipTime));

    playerStatus.setCardsRevealed();

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = target;
      return;
    }

    secondCard = target;

    checkForMatch();
  };

  const unflipCardByTimeout = (
    card: HTMLDivElement,
    timeoutInSeconds: number
  ) => {
    setTimeout(() => {
      if (!cardsDisable.includes(card)) card?.classList.remove('flip');
    }, timeoutInSeconds * 1000);
  };

  const checkForMatch = () => {
    const isMatch =
      Calc.calculate(
        convertToJsExpression(cardsContent[Number(firstCard?.id)])
      ) ===
      Calc.calculate(
        convertToJsExpression(cardsContent[Number(secondCard?.id)])
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

      cardsDisable.push(firstCard, secondCard);
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
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    setCurrentCardsText({});

    const isWin = Number(totalPairs) * 2 === cardsDisable.length;

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
              id={index.toString()}
              key={index.toString()}
              className="memory-card"
              onClick={({ currentTarget }) => flipCard(currentTarget)}
            >
              <span className="front-face">
                {convertToMathExpression(currentCardsText[index] || '')}
              </span>
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
