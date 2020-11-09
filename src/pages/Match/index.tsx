/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { ReactElement, useState } from 'react';

import rocketIcon from '../../assets/icons/rocket.svg';
import smileIcon from '../../assets/icons/smile.svg';
import PageHeader from '../../components/PageHeader';
import Calculation from '../../tools/Calculation';
import { convertToJsExpression } from '../../tools/convertExpression';
import randInt from '../../tools/randInt';
import winModal from './WinModal';

import './styles.css';

const Calc = new Calculation();

const cardFrontFaceIcons: string[] = [rocketIcon, smileIcon];
const cardFrontFaceIcon =
  cardFrontFaceIcons[randInt(0, cardFrontFaceIcons.length)];

function Match(): ReactElement {
  const [cardsContent, setCardsContent] = useState<string[]>([]);
  const [showWinModal, setShowWinModal] = useState(false);

  const cardsDisable: HTMLDivElement[] = [];
  const searchParams = new URLSearchParams(window.location.search);

  const totalCards = Number(searchParams.get('totalPairs')) * 2 || 2;
  const flipTime = Number(searchParams.get('flipTime'));
  const highlightRevealedCards = !!searchParams.get('highlightRevealedCards');
  const customExpressions = searchParams.getAll('customExpression');

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard: HTMLDivElement | null = null;
  let secondCard: HTMLDivElement | null = null;

  function flipCard(target: HTMLDivElement | null) {
    if (lockBoard) return;
    if (target === firstCard || target === null) return;
    if (cardsDisable.includes(target)) return;

    target?.classList.add('flip');

    if (highlightRevealedCards) target.style.border = 'solid yellow';
    if (flipTime > 0) unflipCardByTimeout(target, flipTime);

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = target;
      return;
    }

    secondCard = target;

    checkForMatch();
  }

  function unflipCardByTimeout(card: HTMLDivElement, timeoutInSeconds: number) {
    setTimeout(() => {
      const isMatch =
        firstCard?.dataset.content === secondCard?.dataset.content;

      if (!isMatch) card?.classList.remove('flip');
    }, timeoutInSeconds * 1000);
  }

  function checkForMatch() {
    const isMatch =
      Calc.calculate(firstCard?.dataset.content as string) ===
      Calc.calculate(secondCard?.dataset.content as string);

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    if (firstCard && secondCard) {
      firstCard.classList.add('flip');
      secondCard.classList.add('flip');

      cardsDisable.push(firstCard, secondCard);
    }

    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard?.classList.remove('flip');
      secondCard?.classList.remove('flip');

      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    const isWin = totalCards === cardsDisable.length;

    if (isWin) setTimeout(() => setShowWinModal(true), 1500);
  }

  function generateRandomExpression() {
    const expression = '2 + 2';
    const result = '4';

    return { expression, result };
  }

  function getCardsContent() {
    const contents: string[] = [];

    customExpressions.forEach(expression => {
      contents.push(
        expression,
        Calc.calculate(convertToJsExpression(expression)) as string
      );
    });

    while (contents.length < totalCards) {
      const { expression, result } = generateRandomExpression();
      contents.push(expression, result);
    }

    return contents.sort(() => 0.5 - Math.random());
  }

  setCardsContent(getCardsContent());

  return (
    <div
      className="container"
      id="page-match"
      style={{ overflow: showWinModal ? 'hidden' : 'auto' }}
    >
      <PageHeader hideBackButton title="" />

      <main>
        <section className="memory-game">
          {cardsContent.map((expressionOrResult, index) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <div
              key={Number(index)}
              className="memory-card"
              data-content={expressionOrResult}
              onClick={({ currentTarget }) => flipCard(currentTarget)}
            >
              <span className="front-face">{expressionOrResult}</span>
              <img className="back-face" src={cardFrontFaceIcon} alt="Emoji" />
            </div>
          ))}
        </section>
      </main>

      {winModal({ isOpen: showWinModal })}
    </div>
  );
}

export default Match;
