#### `$.if`

This is the reactive version of the native `if` statement. It returns a read-only Observable that resolves to the passed value if the condition is truthy, or to the optional fallback otherwise.

Interface:

```ts
function if <T, F> ( when: (() => boolean) | boolean, valueTrue: T, valueFalse?: F ): ObservableReadonly<T | F | undefined>;
```

Usage:

```ts
import $ from "reactive";

// Toggling an if

const bool = $(false);

const result = $.if(bool, 123, 321);

result(); // => 321

bool(true);

result(); // => 123
```