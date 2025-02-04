
#### `$()`

The main exported function wraps a value into an Observable, basically wrapping the value in a reactive shell.

An Observable is a function that works both as a getter and as a setter, and it can be writable or read-only, it has the following interface:

```ts
type Observable<T> = {
  (): T;
  (value: T): T;
  (fn: (value: T) => T): T;
};

type ObservableReadonly<T> = {
  (): T;
};
```

The `$()` function has the following interface:

```ts
type ObservableOptions<T> = {
  equals?: ((value: T, valuePrev: T) => boolean) | false;
};

function $<T>(): Observable<T | undefined>;
function $<T>(
  value: undefined,
  options?: ObservableOptions<T | undefined>,
): Observable<T | undefined>;
function $<T>(value: T, options?: ObservableOptions<T>): Observable<T>;
```

This is how to use it:

```ts
import $ from "reactive";

// Create an Observable without an initial value

$<number>();

// Create an Observable with an initial value

$(1);

// Create an Observable with an initial value and a custom equality function

const equals = (value, valuePrev) => Object.is(value, valuePrev);

const o = $(1, { equals });

// Create an Observable with an initial value and a special "false" equality function, which is a shorthand for `() => false`, which causes the Observable to always notify its observers when its setter is called

const oFalse = $(1, { equals: false });

// Getter

o(); // => 1

// Setter

o(2); // => 2

// Setter via a function, which gets called with the current value

o((value) => value + 1); // => 3

// Setter that sets a function, it has to be wrapped in another function because the above form exists

const noop = () => {};

o(() => noop);
```






