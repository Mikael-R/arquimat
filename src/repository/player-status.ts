const setTotalMatches = () =>
  localStorage.setItem(
    'total-matches',
    String(Number(localStorage.getItem('total-matches') || 0) + 1)
  );

const setCameInLastMatch = () =>
  localStorage.setItem(
    'came-in-last-match-as-milliseconds',
    String(new Date().getTime())
  );

const setLastCustomExpression = (expression: string) =>
  localStorage.setItem('last-custom-expression', expression);

const setWins = () =>
  localStorage.setItem(
    'wins',
    String(Number(localStorage.getItem('wins') || 0) + 1)
  );

const setCardsRevealed = () =>
  localStorage.setItem(
    'cards-revealed',
    String(Number(localStorage.getItem('cards-revealed') || 0) + 1)
  );

const setStraightHits = (hits: number) => {
  if (hits > 0 && hits > Number(localStorage.getItem('straight-hits'))) {
    localStorage.setItem('straight-hits', String(hits));
  }
};

const setTimeSpentOnAllMatchesInSeconds = (secondsToAdd: number) =>
  localStorage.setItem(
    'time-spent-on-all-matches-in-seconds',
    String(
      Number(
        localStorage.getItem('time-spent-on-all-matches-in-seconds') || 0
      ) + secondsToAdd
    )
  );

export default {
  setTotalMatches,
  setCameInLastMatch,
  setLastCustomExpression,
  setWins,
  setCardsRevealed,
  setStraightHits,
  setTimeSpentOnAllMatchesInSeconds
};
