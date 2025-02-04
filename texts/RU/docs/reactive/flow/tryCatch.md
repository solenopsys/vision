
#### `$.tryCatch`

This is the reactive version of the native `try..catch` block. If no errors happen the regular value function is executed, otherwise the fallback function is executed, whatever they return is returned wrapped in a read-only Observable.

This is also commonly referred to as an "error boundary".

Interface:

```ts
function tryCatch<T, F>(
  value: T,
  catchFn: ({ error, reset }: { error: Error; reset: () => void }) => F,
): ObservableReadonly<T | F>;
```

Usage:

```ts
import $ from "reactive";

// Create an tryCatch boundary

const o = $(false);

const fallback = ({ error, reset }) => {
  console.log(error);
  setTimeout(() => {
    // Attempting to recovering after 1s
    o(false);
    reset();
  }, 1000);
  return "fallback!";
};

const regular = () => {
  if (o()) throw "whoops!";
  return "regular!";
};

const result = $.tryCatch(fallback, regular);

result(); // => 'regular!'

// Cause an error to be thrown inside the boundary

o(true);

result(); // => 'fallback!'
```
























