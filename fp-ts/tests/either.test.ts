import * as E from 'fp-ts/Either';
import {pipe} from 'fp-ts/function';

describe('Testing Either', () => {
  it('Is right?', () => {
    expect(E.isRight(E.right(1))).toBe(true);
  });

  it('Is left?', () => {
    expect(E.isLeft(E.left(2))).toBe(true);
  });

  describe('getOrElse', () => {
    it('getOrElse when Error on Left', () => {
      const defaultValue = 0;
      const either = E.left<Error, number>(new Error('This is an error'));
      const valueOrDefault = E.getOrElse(() => defaultValue)(either);
      expect(valueOrDefault).toBe(defaultValue);
    });

    it('getOrElse when Error on Left, with pipe', () => {
      const defaultValue = 0;
      expect(
        pipe(
          E.left<Error, number>(new Error('This is an error')),
          E.getOrElse(() => defaultValue)
        )
      ).toBe(defaultValue);
    });

    it('getOrElse when Value on Right', () => {
      const defaultValue = 0;
      const actualValue = 10;
      const either = E.right(actualValue);
      const valueOrDefault = E.getOrElse(() => defaultValue)(either);
      expect(valueOrDefault).toBe(actualValue);
    });
  });
});
