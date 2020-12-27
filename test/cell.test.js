import {
  cellToPosition,
  getNeighbors,
  getLiveNeighbors,
  fromPopulation,
  positionToCell,
  toPopulation,
} from '../src/cell';

describe('cell', () => {
  describe(cellToPosition.name, () => {
    it('returns position from cell', () => {
      expect(cellToPosition('2-3')).toEqual([2, 3]);
    });
  });

  describe(positionToCell.name, () => {
    it('returns cell from position', () => {
      expect(positionToCell([2, 3])).toEqual('2-3');
    });
  });

  describe(fromPopulation.name, () => {
    it('should return empty cells', () => {
      expect(fromPopulation({})).toEqual([]);
    });

    it('should return cells from population', () => {
      expect(
        fromPopulation({
          '2-1': true,
          '2-2': false,
          '3-1': true,
        }),
      ).toEqual(['2-1', '3-1']);
    });
  });

  describe(toPopulation.name, () => {
    it('should return empty population', () => {
      expect(toPopulation([])).toEqual({});
    });

    it('should return population from cells', () => {
      expect(toPopulation(['0-0', '2-1', '2-2', '3-1'])).toEqual({
        '0-0': true,
        '2-1': true,
        '2-2': true,
        '3-1': true,
        '0-1': false,
        '1-0': false,
        '1-1': false,
        '1-2': false,
        '1-3': false,
        '2-0': false,
        '2-3': false,
        '3-0': false,
        '3-2': false,
        '3-3': false,
        '4-0': false,
        '4-1': false,
        '4-2': false,
      });
    });
  });

  describe(getNeighbors.name, () => {
    it('should return neighbors for cell', () => {
      expect(getNeighbors('2-1')).toEqual([
        '1-0',
        '1-1',
        '1-2',
        '2-0',
        '2-2',
        '3-0',
        '3-1',
        '3-2',
      ]);
    });

    it('should handle boundaries', () => {
      expect(getNeighbors('0-0')).toEqual(['0-1', '1-0', '1-1']);
    });
  });

  describe(getLiveNeighbors.name, () => {
    it('should return live neighbors for cell', () => {
      const cell = '2-1';
      expect(getLiveNeighbors({})(cell)).toEqual([]);
      expect(getLiveNeighbors({ '4-2': true, '4-3': true })(cell)).toEqual([]);
      expect(
        getLiveNeighbors({
          '1-0': true,
          '1-1': true,
          '1-2': true,
          '2-0': true,
          '2-2': true,
          '3-0': true,
          '3-1': true,
          '3-2': true,
        })(cell),
      ).toEqual(['1-0', '1-1', '1-2', '2-0', '2-2', '3-0', '3-1', '3-2']);
      expect(
        getLiveNeighbors({
          '1-0': false,
          '1-1': false,
          '1-2': true,
          '2-0': false,
          '2-2': true,
          '3-0': true,
          '3-1': true,
          '3-2': false,
        })(cell),
      ).toEqual(['1-2', '2-2', '3-0', '3-1']);
    });
  });
});
