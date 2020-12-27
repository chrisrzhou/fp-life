import S from 'sanctuary';

import { conway, survive } from '../src/conway';

const testSurvive = (variant, alive, values) => {
  const scenario = survive(variant)(alive);
  values.forEach((value, liveNeighbors) => {
    expect(scenario(liveNeighbors)).toEqual(S.Just(value));
  });
};

describe('conway', () => {
  describe(survive.name, () => {
    it('should return Nothing if input are invalid', () => {
      expect(survive('X1/Y23')(true)(0)).toEqual(S.Nothing);
      expect(survive('B3/Y23')(true)(0)).toEqual(S.Nothing);
      expect(survive('B3S23')(true)(0)).toEqual(S.Nothing);
      expect(survive('b3/s23')(true)(0)).toEqual(S.Nothing);
    });

    it('should satisfy standard (default) rules', () => {
      testSurvive('B3/S23', false, [
        false,
        false,
        false,
        true,
        false,
        false,
        false,
        false,
      ]);
      testSurvive('B3/S23', true, [
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
      ]);
    });

    it('should satisfy custom (Highlife) rules', () => {
      testSurvive('B36/S23', false, [
        false,
        false,
        false,
        true,
        false,
        false,
        true,
        false,
      ]);
      testSurvive('B36/S23', true, [
        false,
        false,
        true,
        true,
        false,
        false,
        false,
        false,
      ]);
    });
  });

  describe(conway.name, () => {
    it('should return Nothing if input is invalid', () => {
      expect(conway('X1/Y23')({})).toEqual(S.Nothing);
      expect(conway('B3S23')({})).toEqual(S.Nothing);
    });

    describe('standard B3/S23 rules', () => {
      it('should kill all living cells without 2 or 3 neighbors', () => {
        expect(
          conway('B3/S23')({
            '2-4': true, // candidate
            '2-3': true,
            '4-2': true,
          }),
        ).toEqual({
          '2-4': false,
          '2-3': false,
          '4-2': false,
        });
      });

      it('should keep living cells with 2 neighbors', () => {
        expect(
          conway('B3/S23')({
            '2-4': true, // candidate
            '2-3': true,
            '2-5': true,
          }),
        ).toEqual({
          '2-4': true,
          '2-3': false,
          '2-5': false,
        });
      });

      it('should keep living cells with 3 neighbors', () => {
        expect(
          conway('B3/S23')({
            '2-4': true, // candidate
            '1-3': true,
            '2-3': true,
            '2-5': true,
          }),
        ).toEqual({
          '2-4': true,
          '1-3': true,
          '2-3': true,
          '2-5': false,
        });
      });
    });

    it('should kill living cells with more than 3 neighbors', () => {
      expect(
        conway('B3/S23')({
          '2-4': true, // candidate
          '1-3': true,
          '1-4': true,
          '2-3': true,
          '2-5': true,
        }),
      ).toEqual({
        '2-4': false,
        '1-4': false,
        '1-3': true,
        '2-3': true,
        '2-5': true,
      });
    });

    it('should birth cells with 3 live neighbors', () => {
      expect(
        conway('B3/S23')({
          '2-4': false, // candidate
          '1-3': true,
          '1-4': true,
          '2-3': true,
        }),
      ).toEqual({
        '2-4': true,
        '1-3': true,
        '1-4': true,
        '2-3': true,
      });
    });
  });
});
