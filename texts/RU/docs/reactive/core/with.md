#### `$.with`

This function allows you to create a function for executing code as if it was a child of the owner/computation active when the function was originally created.

- **Note**: This is an advanced function intended mostly for internal usage.

Interface:

```ts
function with (): (<T> ( fn: () => T ): T);
```

Usage:

```ts
import $ from "reactive";

// Reading some values from the context as if the code was executing inside a different computation

$.root(() => {
  const token = Symbol("Some Context Key");

  $.context({ [token]: 123 }, () => {
    // Writing a value to the context for the inner scope

    const runWithOuter = $.with();

    $.effect(() => {
      $.context({ [token]: 321 }, () => {
        // Overriding some context for the inner scope

        const value = $.context(token); // Reading the context

        console.log(value); // => 321

        runWithOuter(() => {
          // Executing the function as if it was where `$.with` was called

          const value = $.context(token); // Reading the context

          console.log(value); // => 123
        });
      });
    });
  });
});
```