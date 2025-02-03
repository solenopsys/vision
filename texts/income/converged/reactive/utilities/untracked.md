#### `$.untracked`

This function creates an untracked version of a value.

It's functionally equivalent to a simple `() => untrack ( value )`, but the returned function is also marked as being untracked, which allows for some optimizations internally.

Interface:

```ts
function untracked<T>(fn: () => T): () => T;
function untracked<T>(value: T): () => T;
```

Usage:

```ts
import $ from "reactive";

// Creating an untracked function

const a = $(1);
const b = $(2);
const c = $(3);

const sum = $.untracked(() => {
  return a() + b() + c();
});

console.log(sum()); // => 6

a(2);
b(3);
c(4);

console.log(sum()); // => 9
```
