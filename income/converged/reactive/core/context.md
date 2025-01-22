#### `$.context`

This function provides a dependency injection mechanism, you can use it to provide arbitrary values to its inner scope, and those values can be read, or overridden, at any point inside that inner scope.

Interface:

```ts
function context<T>(symbol: symbol): T | undefined; // Read
function context<T>(context: Record<symbol, any>, fn: () => T): T; // Write
```

Usage:

```ts
import $ from "reactive";

// Reading and writing some values in the context

const token = Symbol("Some Context Key");

$.context({ [token]: 123 }, () => {
  // Writing a value to the context for the inner scope

  const value = $.context(token); // Reading a value from the context

  console.log(value); // => 123

  $.context({ [token]: 321 }, () => {
    // Overriding some context for the inner scope

    const value = $.context(token); // Reading again

    console.log(value); // => 321
  });
});
```