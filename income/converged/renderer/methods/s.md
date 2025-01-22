#### `$`

This function is just the default export of `reactive`, it can be used to wrap a value in an observable.

No additional methods are attached to this function. Everything that `reactive` attaches to it is instead exported as components and hooks.

[Read upstream documentation](https://github.com/solenopsys/converged-reactive#core).

Interface:

```ts
function $ <T> (): Observable<T | undefined>;
function $ <T> ( value: undefined, options?: ObservableOptions<T | undefined> ): Observable<T | undefined>;
function $ <T> ( value: T, options?: ObservableOptions<T> ): Observable<T>;
```

Usage:

```tsx
import {$} from 'renderer';

// Create an observable without an initial value

$<number> ();

// Create an observable with an initial value

$(1);

// Create an observable with an initial value and a custom equality function

const equals = ( value, valuePrev ) => Object.is ( value, valuePrev );

const o = $( 1, { equals } );

// Create an observable with an initial value and a special "false" equality function, which is a shorthand for `() => false`, which causes the observable to always emit when its setter is called

const oFalse = $( 1, { equals: false } );

// Getter

o (); // => 1

// Setter

o ( 2 ); // => 2

// Setter via a function, which gets called with the current value

o ( value => value + 1 ); // => 3

// Setter that sets a function, it has to be wrapped in another function because the above form exists

const noop = () => {};

o ( () => noop );
```
