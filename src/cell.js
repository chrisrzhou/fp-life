import S from 'sanctuary';

import { numberToString } from './util';

export const cellToPosition = S.pipe([
  S.splitOn('-'),
  S.map(S.parseInt(10)),
  S.justs,
]);

export const positionToCell = S.pipe([S.map(numberToString), S.joinWith('-')]);

export const getNeighbors = (cell) => {
  const [x, y] = cellToPosition(cell);
  const neighborPositions = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];

  return S.pipe([
    S.filter(([x, y]) => x >= 0 && y >= 0),
    S.map(positionToCell),
  ])(neighborPositions);
};

export const getLiveNeighbors = (population) =>
  S.pipe([getNeighbors, S.filter((neighbor) => Boolean(population[neighbor]))]);

export const trackNeighbors = (population) =>
  S.pipe([
    Object.entries,
    S.reduce(
      S.curry2((acc, [cell, alive]) => {
        if (alive) {
          const neighbors = getNeighbors(cell);
          acc[cell] = true;
          neighbors.forEach((neighbor) => {
            acc[neighbor] = population[neighbor] || false;
          });
        }

        return acc;
      }),
    )({}),
  ])(population);

export const toPopulation = S.pipe([
  S.reduce(
    S.curry2((population, cell) => {
      population[cell] = true;
      return population;
    }),
  )({}),
  trackNeighbors,
]);

export const fromPopulation = S.pipe([
  Object.entries,
  S.reduce(
    S.curry2((cells, [cell, alive]) =>
      S.ifElse(S.K(alive))(S.append(cell))(S.I)(cells),
    ),
  )([]),
]);
