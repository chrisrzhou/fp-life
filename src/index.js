import S from 'sanctuary';

import { fromPopulation, toPopulation } from './cell';
import { conway } from './conway';

const tick = (next) => S.pipe([toPopulation, next, fromPopulation]);

const defaultOptions = {
  next: conway('B3/S23'),
};

const L = (options = defaultOptions) => ({
  tick: tick(options.next),
});

L.conway = conway;

export default L;
