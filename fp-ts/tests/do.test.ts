import { Do } from "fp-ts-contrib/lib/Do";
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'
import * as E from 'fp-ts/Either'

describe('Testing Do', () => {
    test('Do with Options', () => {
        const x = Do(O.Monad) // <- a monad instance
            .bindL('foo', () => O.some('bar'))
            .bindL('baz', () => O.some(4))
            .return(({ foo, baz }) => foo.length + baz);
        if (O.isSome(x)) {
            expect(x.value).toBe(7);
        }
    });

    test('Do with TaskEither', async () => {
        const x = Do(TE.Monad)
            .bind('first', TE.right(1))
            .bind('other', TE.right(10))
            .bindL('second', ({ first }) => TE.right(first + 1))
            .return(({ first, second, other }) => first + second + other);
        const v = await x();
        if (E.isRight(v)) {
            expect(v.right).toBe(13);
        }
    });
});