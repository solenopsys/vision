#### `$.switch`

This is the reactive version of the native `switch` statement. It returns a read-only Observable that resolves to the value of the first matching case, or the value of the default condition, or `undefined` otherwise.

Interface:

```ts
type SwitchCase<T, R> = [T, R];
type SwitchDefault<R> = [R];
type SwitchValue<T, R> = SwitchCase<T, R> | SwitchDefault<R>;

function switch <T, R, F> ( when: (() => T) | T, values: SwitchValue<T, R>[], fallback?: F ): ObservableReadonly<R | F | undefined>;
```

Usage:

```ts
import $ from "reactive";

// Switching cases

const o = $(1);

const result = $.switch(o, [[1, "1"], [2, "2"], [1, "1.1"], ["default"]]);

result(); // => '1'

o(2);

result(); // => '2'

o(3);

result(); // => 'default'
```