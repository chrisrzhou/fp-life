import S from 'sanctuary';

import { getLiveNeighbors } from './cell';
import { ifNotNothing, stringToNumbers } from './util';

const groupsToNumbers = S.pipe([S.justs, S.map(stringToNumbers)]);

const parseVariant = S.pipe([
  S.match(/^B(\d+)\/S(\d+)$/),
  S.map(S.prop('groups')),
  ifNotNothing(S.map(groupsToNumbers)),
]);

export const survive = S.curry3((variant, alive, liveNeighbors) => {
  return S.pipe([
    parseVariant,
    S.chain(S.boolean(S.head)(S.last)(alive)),
    S.map(S.any(S.equals(liveNeighbors))),
  ])(variant);
});

export const conway = S.curry2((variant, population) => {
  return S.pipe([
    Object.entries,
    S.reduce(
      S.curry2((acc, [cell, alive]) => {
        const shouldSurvive = S.pipe([
          getLiveNeighbors(population),
          S.size,
          survive(variant)(alive),
          S.fromMaybe(false),
        ])(cell);
        acc[cell] = shouldSurvive;
        return acc;
      }),
    )({}),
  ])(population);
});
