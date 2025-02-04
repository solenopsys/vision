#### `$.untrack`

This function allows for reading Observables without creating dependencies on them, temporarily turning off tracking basically.

- **Note**: This function turns off tracking for any arbitrary function, the function doesn't have to be an Observable necessarily.

Interface:

```ts
function untrack<T>(fn: () => T): T;
function untrack<T>(value: T): T;
```

Usage:

```ts
import $ from "reactive";

// Untracking a single Observable

const o = $(0);

$.untrack(o); // => 0

// Untracking multiple Observables

const a = $(1);
const b = $(2);
const c = $(3);

const sum = $.untrack(() => {
  return a() + b() + c();
});

console.log(sum); // => 6

a(2);
b(3);
c(4);

console.log(sum); // => 6, it's just a value, not a reactive Observable

// Untracking a non function, it's just returned as is

$.untrack(123); // => 123
```