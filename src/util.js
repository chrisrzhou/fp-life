import S from 'sanctuary';

export const ifNotNothing = S.ifElse(S.isNothing)(S.I);

export const numberToString = (x) => x.toString();

export const stringToNumbers = S.pipe([
  S.splitOn(''),
  S.map(S.parseInt(10)),
  S.justs,
]);

export const tap = S.curry2((message, x) => {
  console.log(`${message}\n${S.show(x)}`);
  return x;
});

export const validate = (test) => S.ifElse(test)(S.I)(S.K(S.Nothing));
