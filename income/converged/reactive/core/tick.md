#### `$.tick`

This function forces effects scheduled for execution to be executed immediately, bypassing automatic or manual batching.

Interface:

```ts
function tick(): void;
```

Usage:

```ts
import $ from "reactive";

$.effect(() => {
  console.log("effect called");
});

// Here the effect has not been called yet

$.tick();

// Here the effect has been called
```