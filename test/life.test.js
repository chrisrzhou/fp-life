import L from '../src';

describe('L', () => {
  describe('L.tick', () => {
    it('should compute next generation of cells (next=default/conway)', () => {
      const life = L();
      const cells = [];

      expect(life.tick(cells)).toEqual([]);
    });

    it('should compute next generation of cells (next=conway-variant)', () => {
      const next = L.conway('B36/S23');
      const life = L({ next });
      const cells = [];

      expect(life.tick(cells)).toEqual([]);
    });

    it('should compute next generation of cells (next=custom)', () => {
      const deadNext = () => ({});
      const staticNext = () => ({
        '1-1': true,
        '2-2': true,
        '2-3': true,
      });

      const deadLife = L({ next: deadNext });
      const staticLife = L({ next: staticNext });
      const cells = [
        '0-1',
        '0-2',
        '0-3',
        '1-0',
        '1-1',
        '1-2',
        '1-3',
        '2-0',
        '2-1',
        '2-2',
        '2-3',
      ];

      expect(deadLife.tick(cells)).toEqual([]);
      expect(staticLife.tick(cells)).toEqual(['1-1', '2-2', '2-3']);
    });
  });
});
