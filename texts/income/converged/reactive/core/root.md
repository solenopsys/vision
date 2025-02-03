#### `$.root`

This function creates a computation root, computation roots are detached from parent roots/memos/effects and will outlive them, so they must be manually disposed of, disposing them ends all the reactvity inside them, except for any eventual nested roots.

The value returned by the function is returned by the root itself.

Interface:

```ts
function root<T>(fn: (dispose: () => void) => T): T;
```

Usage:

```ts
import $ from "reactive";

// Create a root and dispose of it

$.root((dispose) => {
  let calls = 0;

  const a = $(0);
  const b = $.memo(() => {
    calls += 1;
    return a();
  });

  console.log(calls); // => 0, memos are not refreshed until necessary
  b(); // => 0
  console.log(calls); // => 1, now the memo got refreshed, because we asked for its value and it didn't have a fresh value

  a(1);

  console.log(calls); // => 1, not refreshed, because we don't need the new value yet
  b(); // => 1
  console.log(calls); // => 2, refreshed, because we asked for a new value

  dispose(); // Now all the reactivity inside this root stops

  a(2);

  console.log(calls); // => 2, not refreshed, because we don't need the new value yet
  b(); // => 1
  console.log(calls); // => 2, still not refreshed, because we disposed of the memo so its value will never change anymore
});
```