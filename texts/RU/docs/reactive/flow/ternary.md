#### `$.ternary`

This is the reactive version of the native ternary operator. It returns a read-only Observable that resolves to the first value if the condition is truthy, or the second value otherwise.

Interface:

```ts
function ternary<T, F>(
  when: (() => boolean) | boolean,
  valueTrue: T,
  valueFalse: T,
): ObservableReadonly<T | F>;
```

Usage:

```ts
import $ from "reactive";

// Toggling an ternary

const bool = $(false);

const result = $.ternary(bool, 123, 321);

result(); // => 321

bool(true);

result(); // => 123
```