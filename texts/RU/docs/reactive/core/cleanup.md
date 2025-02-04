#### `$.cleanup`

This function allows you to register cleanup functions, which are executed automatically whenever the parent memo/effect/root is disposed of, which also happens before re-executing it.

Interface:

```ts
function cleanup(fn: () => void): void;
```

Usage:

```ts
import $ from "reactive";

// Attaching some cleanup functions to an effect

const callback = $(() => {});

$.effect(() => {
  const cb = callback();

  document.body.addEventListener("click", cb);

  $.cleanup(() => {
    // Registering a cleanup function with the parent

    document.body.removeEventListener("click", cb);
  });

  $.cleanup(() => {
    // You can have as many cleanup functions as you want

    console.log("cleaned up!");
  });
});

await nextTask(); // Giving the effect a chance to run

callback(() => () => {}); // Causing the effect to be scheduled for re-execution

await nextTask(); // Giving the effect a chance to run. Once it runs it will call the previous cleanup functions and register new ones
```